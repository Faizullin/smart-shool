import random

from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class ChatRoom(models.Model):
    OPEN = 'open'
    CLOSED = 'closed'
    STATUS_CHOICES = [
        (OPEN, 'Open'),
        (CLOSED, 'Closed')
    ]

    bot_chat_id = models.CharField(
        max_length=20, unique=True, null=False, blank=True, )
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(
        UserModel, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_rooms_owned')
    users = models.ManyToManyField(UserModel, blank=True,)
    status = models.CharField(
        max_length=6, choices=STATUS_CHOICES, default=OPEN)

    def __str__(self):
        return self.title

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ChatMessage(models.Model):
    LANG_CHOICES = (
        ('ru', 'Russian'),
        ('kk', 'Kazakh'),
        ('en', 'English'),
    )
    TYPE_CHOICES = (
        ('m', 'Message'),
        ('r', 'Response'),
        ('br', 'Bot Response'),
    )

    lang = models.CharField(
        max_length=3,
        choices=LANG_CHOICES,
        default='en',
    )
    chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_messages')
    msg = models.CharField(max_length=1000, null=True, blank=True)
    owner = models.ForeignKey(
        UserModel, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_messages_owned')
    recipient = models.ForeignKey(UserModel, null=True, blank=True, on_delete=models.SET_NULL,
                                  verbose_name='recipient', related_name='to_user', db_index=True)
    type = models.CharField(
        max_length=3,
        choices=TYPE_CHOICES,
        default='m',
    )
    reply_to = models.ForeignKey(
        "chats.ChatMessage", null=True, blank=True, on_delete=models.SET_NULL, db_index=True)

    def __str__(self):
        return str(self.chat_room) + '-' + str(self.owner)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class QuestionTicket(models.Model):
    OPEN = 'o'
    CLOSED = 'c'
    STATUS_CHOICES = (
        (OPEN, 'Open'),
        (CLOSED, 'Closed'),
    )

    requested_chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='question_tickets_from')
    requested_chat_message = models.ForeignKey(
        ChatMessage, null=True, blank=True, on_delete=models.SET_NULL)
    to_chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='question_tickets_to')
    msg = models.CharField(max_length=1000, null=True, blank=True)
    owner = models.ForeignKey(
        UserModel, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default='o',
    )

    def __str__(self):
        return str(self.requested_chat_room) + '-' + str(self.owner)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def get_or_generate_chat_room(room_id=None, owner: UserModel = None) -> ChatRoom:

    bot_session_id = str(random.randint(0, 99)+100000)
    if room_id:
        chat_room_q = ChatRoom.objects.filter(id=room_id,)
        chat_room = chat_room_q.last() if chat_room_q.exists() else ChatRoom.objects.create(
            bot_chat_id=bot_session_id,
            title='Chat-' + bot_session_id,
            owner=owner,
        )
        chat_room.users.add(owner)
        chat_room.save()
    else:
        chat_room = ChatRoom.objects.create(
            bot_chat_id=bot_session_id,
            title='Chat-' + bot_session_id,
            owner=owner,
        )
        chat_room.users.add(owner, get_bot())
        chat_room.save()
    return chat_room


def get_bot() -> UserModel:
    return UserModel.objects.filter(groups__name='bot').last()
