from django.urls import path
from .views import *

app_name = 'chats'

urlpatterns = [
      path('api/v1/chat/new/', ChatCreateView.as_view(), name='chats-create'),
      path('api/v1/chat/my/', ChatListMyView.as_view(), name='chats-list-my'),
      path('api/v1/chat/<int:chat_id>/messages/new/', ChatMessageNewView.as_view(), name='chats-messages-new'),
      path('api/v1/chat/<int:chat_id>/messages/', ChatMessageListView.as_view(), name='chats-messages-list'),
      path('api/v1/chat/<int:chat_id>/users/', ChatUserListView.as_view(), name='chats-users-list'),
]

