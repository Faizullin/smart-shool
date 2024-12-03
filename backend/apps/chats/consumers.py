import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import ChatMessage, ChatRoom, get_or_generate_chat_room, get_bot
from .operations import get_chat_room_name
# from django_q.tasks import async_task
from .serializers import ChatSendMessageSerializer
from .tasks import process_user_message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            await self.close()
            return
        await self.accept()
        self.user = self.scope["user"]
        self.chat_room_id = self.scope['url_route']['kwargs']['room_name']
        self.chat_room_group_name = get_chat_room_name(self.chat_room_id)
        await self.channel_layer.group_add(
            self.chat_room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        print("Disconnected")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        lang = text_data_json['lang'] if 'lang' in text_data_json.keys(
        ) else 'en'
        user = self.scope['user']

        print("Recieved", text_data_json)

        chat_room = await database_sync_to_async(
            self.get_or_generate_chat_room
        )(self.chat_room_id)

        if chat_room.status == ChatRoom.CLOSED:
            await self.channel_layer.group_send(
                self.chat_room_group_name,
                {
                    'type': 'chat_message',
                    'message': {
                        'type': 'e',
                        'msg': 'Chat is closed. No new messages can be added.',
                    }
                }
            )
            return

        chat_message = await database_sync_to_async(
            self.saveMessage
        )(message, lang, self.chat_room_id)

        await self.channel_layer.group_send(
            self.chat_room_group_name,
            {
                'type': 'chat_message',
                'message': ChatSendMessageSerializer(chat_message).data

            }
        )

        isBotInChat = await database_sync_to_async(
            self.isBotInChat
        )(self.chat_room_id)
        if isBotInChat:
            # process_user_message(
            #     chat_message.pk,
            #     send_ws=True,
            #     user_id=user.pk,
            # )
            await database_sync_to_async(
                process_user_message
            )(
                chat_message.pk,
                send_ws=True,
                user_id=user.pk,
            )
            # async_task(
            #     process_user_message,
            #     chat_message.pk,
            #     send_ws=True,
            #     user_id=user.pk,
            # )

    async def chat_message(self, event, type='chat_message'):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    def get_or_generate_chat_room(self, chat_room_id) -> ChatRoom:
        user = self.scope['user']
        return get_or_generate_chat_room(chat_room_id, user)

    def saveMessage(self, message, lang, chat_room_id) -> ChatMessage:
        user = self.scope['user']
        chat_room = get_or_generate_chat_room(chat_room_id, user)
        chatMessageObj = ChatMessage.objects.create(
            chat_room=chat_room,
            owner=user,
            msg=message,
            lang=lang,
            type='m'
        )
        return chatMessageObj

    def isBotInChat(self, chat_room_id) -> bool:
        bot_user = get_bot()
        chat_room = ChatRoom.objects.get(id=chat_room_id)
        return bot_user in chat_room.users.all()
