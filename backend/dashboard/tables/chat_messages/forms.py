
from django import forms
from chats.models import ChatMessage


class ChatMessageForm(forms.ModelForm):
    class Meta:
        model = ChatMessage
        fields = ['lang', 'chat_room', 'msg', 'owner', 'recipient', 'type']
