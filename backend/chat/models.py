import random
from django.db import models
from accounts.models import User

# Create your models here.


class ChatRoom(models.Model):
    bot_chat_id = models.CharField(
        max_length=20, unique=True, null=False, blank=True, )
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL,)

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
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL)
    msg = models.CharField(max_length=1000, null=True, blank=True)
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    recipient = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL,
                                  verbose_name='recipient', related_name='to_user', db_index=True)
    type = models.CharField(
        max_length=3,
        choices=TYPE_CHOICES,
        default='m',
    )

    def __str__(self):
        return str(self.chat_room) + '-' + str(self.owner)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class QuestionTicket(models.Model):
    STATUS_CHOICES = (
        ('o', 'Open'),
        ('c', 'Closed'),
    )

    requested_chat_room = models.ForeignKey(
        ChatRoom, null=True, blank=True, on_delete=models.SET_NULL)
    requested_chat_message = models.ForeignKey(
        ChatMessage, null=True, blank=True, on_delete=models.SET_NULL)
    msg = models.CharField(max_length=1000, null=True, blank=True)
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default='o',
    )

    def __str__(self):
        return str(self.requested_chat_room) + '-' + str(self.owner)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def get_or_generate_chat_room(room_id=None, owner: User = None) -> ChatRoom:
    bot_session_id = str(random.randint(0, 99)+100000)
    if room_id:
        chat_room_q = ChatRoom.objects.filter(id=room_id,)
        chat_room = chat_room_q.last() if chat_room_q.exists() else ChatRoom.objects.create(
            bot_chat_id=bot_session_id,
            title='Chat-' + bot_session_id,
            owner=owner,
        )
    else:
        chat_room = ChatRoom.objects.create(
            bot_chat_id=bot_session_id,
            title='Chat-' + bot_session_id,
            owner=owner,
        )
    return chat_room

def get_bot() -> User:
    return User.objects.filter(groups__name='bot').last()