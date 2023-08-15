
from django import forms
from chat.models import ChatMessage

class ChatMessageForm(forms.ModelForm):    
    class Meta:
        model = ChatMessage
        fields = ['id','chat_room','owner','recipient','msg','lang']