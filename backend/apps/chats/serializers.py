from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import ChatMessage, ChatRoom

UserModel = get_user_model()


class ChatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', )


class ChatMessageSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ('id', 'msg', 'owner', 'type', 'recipient',
                  'lang', 'created_at', 'updated_at',)

    def get_owner(self, obj: ChatMessage):
        return obj.owner.pk

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')


class ChatSendMessageSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ('id', 'msg', 'owner', 'type', 'recipient',
                  'lang', 'created_at', 'updated_at')

    def get_owner(self, obj: ChatMessage):
        return obj.owner.pk

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('id', 'bot_chat_id', 'owner',
                  'title', 'created_at', 'updated_at')

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')


class ChatRecieveMessageSerializer(serializers.Serializer):
    message = serializers.CharField(write_only=True,)
    lang = serializers.CharField(write_only=True)
