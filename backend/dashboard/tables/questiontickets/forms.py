
from django import forms
from chat.models import QuestionTicket


class QuestionTicketForm(forms.ModelForm):
    class Meta:
        model = QuestionTicket
        fields = ['requested_chat_room',
                  'requested_chat_message', 'msg', 'owner', 'status',]
