
from django import forms
from chats.models import ChatRoom


class ChatForm(forms.ModelForm):
    class Meta:
        model = ChatRoom
        fields = ['bot_chat_id', 'title', 'owner']
