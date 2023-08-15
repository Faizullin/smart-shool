from django.urls import path
from .views import *

app_name = 'chat'

urlpatterns = [
      path('api/chat/new/', ChatCreateView.as_view(), name='chats-create'),
      path('api/chat/my/', ChatListMyView.as_view(), name='chats-list-my'),
      path('api/chat/<int:chat_id>/messages/new/', ChatMessageNewView.as_view(), name='chats-messages-new'),
      path('api/chat/<int:chat_id>/messages/', ChatMessageListView.as_view(), name='chats-messages-list'),
      path('api/chat/<int:chat_id>/users/', ChatUserListView.as_view(), name='chats-users-list'),
]

