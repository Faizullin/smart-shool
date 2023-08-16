
from django.urls import path
from .views import *

urlpatterns = [
    path('', ChatListView.as_view(), name='chat_list'),
    path('create', chat_create, name='chat_create'),
    path('update/<int:pk>', chat_edit, name='chat_edit'),
    path('delete/<int:pk>', chat_delete, name='chat_delete'),
    path('start', chat_start, name='chat_start'),
]