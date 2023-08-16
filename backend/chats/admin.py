from django.contrib import admin
from .models import ChatRoom, ChatMessage, QuestionTicket

# Register your models here.
admin.site.register(ChatRoom, )
admin.site.register(ChatMessage, )
admin.site.register(QuestionTicket, )