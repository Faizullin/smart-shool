import asyncio
import json
import random
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from .models import ChatMessage, ChatRoom, get_or_generate_chat_room
from .tasks import process_user_message
from .operations import get_chat_room_name

from django_q.tasks import async_task
from .serializers import ChatSendMessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            await self.close()
            return
        await self.accept()
        self.user = self.scope["user"]
        self.chat_room = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = get_chat_room_name(self.chat_room)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        print("Disconnected")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        lang = text_data_json['lang'] if 'lang' in text_data_json.keys(
        ) else 'en'

        print("Recieved", text_data_json)

        chatMessageObj = await database_sync_to_async(
            self.saveMessage
        )(message, lang, self.chat_room)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': ChatSendMessageSerializer(chatMessageObj).data

            }
        )

        async_task(
            process_user_message,
            chatMessageObj.pk
        )

    # Receive message from room group
    async def chat_message(self, event, type='chat_message'):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    def saveMessage(self, message, lang, roomId) -> ChatMessage:
        userObj = self.scope['user']
        chat_room = get_or_generate_chat_room(roomId, userObj)
        chatMessageObj = ChatMessage.objects.create(
            chat_room=chat_room,
            owner=userObj,
            msg=message,
            lang=lang,
            type='m'
        )
        return chatMessageObj
