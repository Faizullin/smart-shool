import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

User = get_user_model()


class ErrorCode:
    INVALID_ARGUMENT = 4000
    PERMISSION_DENIED = 4001
    NOT_FOUND = 4002
    SERVER_ERROR = 4003
    RATE_EXCEED = 4004
    AUTHENTICATION_ERROR = 4005


class ErrorMessage:
    INVALID_ARGUMENT = "Invalid argument provided."
    PERMISSION_DENIED = "Permission denied for the device."
    NOT_FOUND = "Device not found."
    SERVER_ERROR = "Internal server error."
    SENSOR_DATA_TIME_DELAY = "Submission limit exceeded."
    AUTHENTICATION_ERROR = "Authentication required."


class UserChatInterface:
    username = None
    id = None

    def __init__(self, data):
        if type(data) is dict:
            self.username = data['user_full_name']
            self.id = data['user_id']
        elif isinstance(data, User):
            self.username = data.username
            self.id = data.id
        else:
            raise Exception(f"Unknown data type for user {type(data)}")

    def to_json(self):
        return {
            'user_id': self.id,
            'user_full_name': self.username
        }


class AsyncBaseDataUserConsumer(AsyncWebsocketConsumer):
    USERS_CONNECTED = []
    room_group_name: str = None
    room_id: int = None

    def get_group_room_name(self):
        raise NotImplementedError("Subclasses must implement this method")

    def find_user(self, user):
        for user_connected_item in self.USERS_CONNECTED:
            if user_connected_item.id == user.id:
                return user_connected_item
        return None

    async def connect(self):
        user = self.scope["user"]
        room_id = self.scope['url_route']['kwargs']['room_name']
        self.room_id = room_id
        self.room_group_name = self.get_group_room_name()
        await self.accept()
        if user.is_authenticated:
            res = await self.check_permissions(room_id, user)
            if not res[0]:
                await self.close(**res[1])
                return
            await self.channel_layer.group_add(
                self.room_group_name, self.channel_name
            )
        else:
            await self.close(code=ErrorCode.AUTHENTICATION_ERROR, reason=ErrorMessage.AUTHENTICATION_ERROR)
            return
        return True

    @database_sync_to_async
    def check_permissions(self, room_id, user):
        return True, None

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            user_data = UserChatInterface(self.scope['user'])
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "disconnected",
                    "data": {"from": user_data.to_json()},
                },
            )
            await (self.channel_layer.group_discard)(
                self.room_group_name, self.channel_name
            )
            found_user = self.find_user(user_data)
            if found_user is not None:
                self.USERS_CONNECTED.remove(found_user)

    async def receive(self, text_data):
        received_data = json.loads(text_data)
        event_type = received_data["type"]
        if event_type == "new_user_joined":
            new_user_data = UserChatInterface(self.scope['user'])
            if not self.find_user(new_user_data):
                self.USERS_CONNECTED.append(new_user_data)
            print([i.id for i in self.USERS_CONNECTED], self.room_group_name, self.room_id)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "new_user_joined",
                    "data": {
                        "from": new_user_data.to_json()
                    },
                },
            )
        elif event_type == "disconnected":
            current_user_data = UserChatInterface(self.scope['user'])
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "disconnected",
                    "data": {
                        "data": received_data['data'],
                        "from": current_user_data.to_json(),
                    },
                },
            )
        await self.handle_event(event_type, received_data)

    async def handle_event(self, event_type, received_data):
        raise NotImplementedError("Subclasses must implement this method")

    async def send_event(self, event_type, data, use_users_connected=True, use_from=True):
        send_data = {
            "type": event_type,
            **data,
        }
        if use_users_connected:
            send_data["users_connected"] = [i.to_json()
                                            for i in self.USERS_CONNECTED]
        if use_from:
            send_data["from"] = data['from']
        await self.send(
            json.dumps(send_data)
        )

    async def new_user_joined(self, event):
        print("new_user_joined", [i.id for i in self.USERS_CONNECTED], self.room_group_name, self.room_id)
        await self.send_event(event["type"], event["data"])

    async def disconnected(self, event):
        await self.send_event(event["type"], event["data"])


class AsyncBaseDataConsumer(AsyncWebsocketConsumer):
    room_group_name: str = None
    room_id: int = None

    def get_group_room_name(self):
        raise NotImplementedError("Subclasses must implement this method")

    async def connect(self):
        room_id = self.scope['url_route']['kwargs']['room_name']
        self.room_id = room_id
        self.room_group_name = self.get_group_room_name()
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await (self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data):
        received_data = json.loads(text_data)
        event_type = received_data["type"]
        await self.handle_event(event_type, received_data)

    async def handle_event(self, event_type, received_data):
        raise NotImplementedError("Subclasses must implement this method")

    async def send_event(self, event_type, data, use_from=True):
        send_data = {
            "type": event_type,
            **data,
        }
        if use_from:
            send_data["from"] = data['from']
        await self.send(
            json.dumps(send_data)
        )

    async def disconnected(self, event):
        await self.send_event(event["type"], event["data"])
