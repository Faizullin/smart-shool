from accounts.models import User
from .models import ChatMessage, ChatRoom
from .operations import get_response, send_ws_message
from .serializers import ChatSendMessageSerializer


def process_user_message(
    user_chat_message_id,
    send_ws = True,
    user_id = None,
):
    bot = User.objects.filter(groups__name='bot').last()
    chatMessage = ChatMessage.objects.get(id=user_chat_message_id)

    response = get_response(chatMessage, chatMessage.lang, user_id)
    result_chat_message = ChatMessage.objects.create(
        chat_room=chatMessage.chat_room,
        msg=response,
        owner=bot,
        recipient=chatMessage.owner,
    )
    if send_ws:
        send_ws_message(
            ChatSendMessageSerializer(result_chat_message).data,
            result_chat_message.chat_room,
        )
