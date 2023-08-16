
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit
from chats.models import ChatRoom


class ChatForm(forms.ModelForm):
    class Meta:
        model = ChatRoom
        fields = ['bot_chat_id', 'title', 'owner', 'users', 'status']


class ChatSendForm(forms.Form):
    LANG_CHOICES = (
        ('ru', 'Russian'),
        ('en', 'English'),
        ('kk', 'Kazakh'),
    )
    msg = forms.CharField(max_length=1000,)
    lang = forms.ChoiceField(choices=LANG_CHOICES)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'msg',
            'lang',
            Submit('submit', 'Send', css_class='btn btn-primary')
        )
