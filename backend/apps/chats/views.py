from django.conf import settings
from django.db.models import Q
# from django_q.tasks import async_task
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import get_or_generate_chat_room, get_bot
from .serializers import *
from .tasks import process_user_message


# Create your views here.


class ChatMessageListView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        chat_room = self.kwargs['chat_id']

        queryset = ChatMessage.objects.filter(chat_room=chat_room)
        last_message_id = self.request.query_params.get('last_message_id')
        if last_message_id:
            try:
                last_message_id = int(last_message_id)
                if last_message_id != -1:
                    queryset = queryset.filter(id__gt=last_message_id)
                else:
                    queryset = []
            except ValueError:
                pass

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ChatUserListView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = ChatUserSerializer

    def get_queryset(self):
        chat_room = ChatRoom.objects.get(id=self.kwargs['chat_id'])
        chat_messages = ChatMessage.objects.filter(chat_room=chat_room)
        chat_owners_ids = set([i.owner_id for i in chat_messages])
        return User.objects.filter(id__in=chat_owners_ids)


class ChatCreateView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print(request.user.id)
        chat_room = get_or_generate_chat_room(None, request.user)
        return Response(ChatRoomSerializer(chat_room).data)


class ChatListMyView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = ChatRoomSerializer

    def get_queryset(self):
        return ChatRoom.objects.filter(Q(users=self.request.user))


class ChatMessageNewView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, chat_id):
        serializer = ChatRecieveMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        user = request.user
        message = validated_data['message']
        lang = validated_data['lang']
        chat_room = get_or_generate_chat_room(chat_id, user)
        if chat_room.status == ChatRoom.CLOSED:
            return Response({
                'type': 'e',
                'msg': 'Chat is closed. No new messages can be added.',
            })

        chat_message = ChatMessage.objects.create(
            chat_room=chat_room,
            owner=user,
            msg=message,
            lang=lang,
            type='m'
        )
        bot_user = get_bot()
        if bot_user in chat_room.users.all():
            process_user_message(
                chat_message.pk,
                False,
                user.pk
            )
            # if settings.USE_WS:
            #     async_task(
            #         process_user_message,
            #         chat_message.pk,
            #         False,
            #         user.pk
            #     )
            # else:
            #     process_user_message(chat_message.pk, False, user.pk)

        return Response(ChatSendMessageSerializer(chat_message).data)
