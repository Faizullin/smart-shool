
from django.urls import path
from .views import *

urlpatterns = [
    path('', ChatMessageListView.as_view(), name='chatmessage_list'),
    path('create', chatmessage_create, name='chatmessage_create'),
    path('update/<int:pk>', chatmessage_edit, name='chatmessage_edit'),
    path('delete/<int:pk>', chatmessage_delete, name='chatmessage_delete'),
]