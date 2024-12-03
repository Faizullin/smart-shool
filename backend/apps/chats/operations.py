# import dialogflow  # from dialogflow_v2 import dialogflow_v2 as Dialogflow
# from django_q.tasks import async_task
from collections import deque

import requests
from apps.academics.models import AcademicSession
from apps.results.models import Result
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.template import Context, Template

from .models import ChatMessage, ChatRoom, QuestionTicket

UserModel = get_user_model()

GOOGLE_AUTHENTICATION_FILE_NAME = "bot-auth-settings.json"
simple_responses = ['input.welcome', 'input.unknown', 'input.support-action']
process_responses = ['input.support-redirect', 'input.support-student-creds']

context = deque(maxlen=5)


# Build context from last conversations

def add_to_context(question, answer):
    context.append({"question": question, "answer": answer})


def get_raw_response(input_value: ChatMessage, language_code):
    API_KEY = settings.CHAT_AI_API_KEY
    ASSISTANT_ID = settings.CHAT_AI_API_ID
    API_BASE_URL = "https://apikazllm.nu.edu.kz"
    message = input_value.msg

    # bot = get_bot()
    # user_messages = ChatMessage.objects.order_by("-created_at").filter(chat_room=input_value.chat_room,
    #                                                                    owner=input_value.owner)[1:4]
    # bot_messages = ChatMessage.objects.filter(reply_to__in=user_messages)
    # print(bot_messages, bot_messages)
    #
    url = f"{API_BASE_URL}/assistant/{ASSISTANT_ID}/interactions/"
    #
    # context = []
    # if user_messages and bot_messages:
    #     for u, b in zip(user_messages, bot_messages):
    #         context.append(f"Q: {u.msg}\nA: {b.msg}\n")
    # mmm = "\n".join(context)
    prompt = message
    payload = {"text_prompt": prompt, "file_prompt": None}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Api-Key {API_KEY}"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        result = data.get("vllm_response", {}).get("content", "{}")
        return result  # Expected to be a JSON string
    except requests.RequestException as e:
        return {
            "message": f"Error: {str(e)}",
            "command": "none",
            "args": []
        }
    # # print('Body', request.body)
    # # input_dict = convert(request.body)
    # # input_text = json.loads(input_dict)['text']
    #
    # current_directory = os.path.dirname(os.path.realpath(__file__))
    # path = os.path.join(current_directory, GOOGLE_AUTHENTICATION_FILE_NAME)
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = path
    #
    # with open(path, 'r') as f:
    #     # project_id = "newagent-aylc"
    #     project_data = json.loads(f.read())
    #     GOOGLE_PROJECT_ID = project_data['project_id']
    #
    # session_id = "1234567891"
    # context_short_name = "does_not_matter"
    #
    # context_name = "projects/" + GOOGLE_PROJECT_ID + "/agent/sessions/" + \
    #                session_id + "/contexts/" + context_short_name.lower()
    #
    # parameters = dialogflow.types.struct_pb2.Struct()
    # # parameters["foo"] = "bar"
    #
    # context_1 = dialogflow.types.context_pb2.Context(
    #     name=context_name,
    #     lifespan_count=2,
    #     parameters=parameters
    # )
    # query_params_1 = {"contexts": [context_1]}
    #
    # response = detect_intent_with_parameters(
    #     project_id=GOOGLE_PROJECT_ID,
    #     session_id=session_id,
    #     query_params=query_params_1,
    #     language_code=language_code,
    #     user_input=input_text
    # )
    # return response


def detect_intent_with_parameters(project_id, session_id, query_params, language_code, user_input):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversaion."""
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print('Session path: {}'.format(session))

    text = user_input

    text_input = dialogflow.types.TextInput(
        text=text, language_code=language_code)

    query_input = dialogflow.types.QueryInput(text=text_input)

    response = session_client.detect_intent(
        session=session, query_input=query_input,
        query_params=query_params,
    )

    print('Detected intent: {} (confidence: {})'.format(
        response.query_result.intent.display_name,
        response.query_result.intent_detection_confidence))

    return response


def get_response(input_value: ChatMessage, language_code: str, user_id=None, raise_exception=True) -> str:
    if raise_exception:
        result = get_raw_response(input_value, language_code)
        print(result, type(result))
        # result = json.loads(result)
        # result_action = result["command"]
        if result in process_responses:
            return process_query(result, input_value, user_id)
        else:
            return result
    else:
        try:
            result = get_raw_response(input_value, language_code)
            result_action = result.query_result.action
            print("Action =", result_action)
            if result_action in simple_responses:
                return result.query_result.fulfillment_text
            elif result_action in process_responses:
                return process_query(result, input_value, user_id)
            else:
                return "Not found command error"
        except Exception as err:
            print("Error: " + str(err))
            return "Error: " + str(err)


def get_chat_room_name(chat_room) -> str:
    return 'chat_%s' % chat_room


def get_support_staff_user():
    return Group.objects.get(name='admin').user_set.first()


def process_query(query, input_value: ChatMessage, user_id=None):
    query_action = query.query_result.action
    if query_action == 'input.support-redirect':
        ticket_queryset = QuestionTicket.objects.filter(
            requested_chat_room=input_value.chat_room,
            owner=input_value.owner,
        )
        if ticket_queryset.exists():
            ticket = ticket_queryset.last()
            return 'Wait!. Ticket aleary created with id: ' + str(ticket.pk)
        else:
            support_user = get_support_staff_user()
            new_chat_room, created = ChatRoom.objects.get_or_create(
                bot_chat_id=input_value.chat_room.bot_chat_id + '-t',
                owner=support_user,
            )
            new_chat_room.status = ChatRoom.OPEN
            new_chat_room.title = 'Ticket to ' + input_value.chat_room.title
            new_chat_room.users.add(input_value.owner, support_user)
            new_chat_room.save()
            ticket = QuestionTicket.objects.create(
                requested_chat_room=input_value.chat_room,
                requested_chat_message=input_value,
                to_chat_room=new_chat_room,
                msg='',
                owner=support_user,
            )
            return f'/redirect to {ticket.to_chat_room.title}'
    elif query_action == 'input.support-student-creds':
        output_raw_txt = str(query.query_result.fulfillment_text)
        output_raw_txt = output_raw_txt.replace('{', '{{')
        output_raw_txt = output_raw_txt.replace('}', '}}')
        user = UserModel.objects.get(id=user_id)
        student = user.student
        context = {
            'student': student,
        }
        student_results = Result.objects.filter(
            student=student, semester=AcademicSession.objects.last())
        current_total_score = sum(
            [result.total_marks for result in student_results])
        context['student'].current_total_score = current_total_score
        return Template(output_raw_txt).render(Context(context))
    raise Exception("Not found command: " + query_action)


def send_ws_message(message: dict, chat_room: ChatRoom):
    if settings.USE_WS:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            get_chat_room_name(chat_room.pk),
            {
                'type': 'chat_message',
                'message': message,
            }
        )
