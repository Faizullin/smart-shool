
from django import forms
from chats.models import QuestionTicket


class QuestionTicketForm(forms.ModelForm):
    class Meta:
        model = QuestionTicket
        fields = ['requested_chat_room', 'requested_chat_message',
                  'to_chat_room', 'msg', 'owner', 'status', ]
