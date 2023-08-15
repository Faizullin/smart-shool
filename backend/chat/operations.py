from django.http import HttpResponse
import dialogflow  # from dialogflow_v2 import dialogflow_v2 as Dialogflow
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django_q.tasks import async_task
import os
import json

from django.conf import settings
from .models import ChatMessage, ChatRoom, QuestionTicket
from accounts.models import User
from academics.models import AcademicSession
from students.models import Student
from django.template import Template, Context
from results.models import Result
from chat.models import ChatRoom, get_bot

# Create your views here.

GOOGLE_AUTHENTICATION_FILE_NAME = "bot-auth-settings.json"
simple_responses = ['input.welcome', 'input.unknown', 'input.support-action']
process_responses = ['input.support-redirect', 'input.support-student-creds']


def get_raw_response(input_text: str, language_code):
    # print('Body', request.body)
    # input_dict = convert(request.body)
    # input_text = json.loads(input_dict)['text']

    current_directory = os.path.dirname(os.path.realpath(__file__))
    path = os.path.join(current_directory, GOOGLE_AUTHENTICATION_FILE_NAME)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = path

    with open(path, 'r') as f:
        # project_id = "newagent-aylc"
        project_data = json.loads(f.read())
        GOOGLE_PROJECT_ID = project_data['project_id']

    session_id = "1234567891"
    context_short_name = "does_not_matter"

    context_name = "projects/" + GOOGLE_PROJECT_ID + "/agent/sessions/" + \
        session_id + "/contexts/" + context_short_name.lower()

    parameters = dialogflow.types.struct_pb2.Struct()
    # parameters["foo"] = "bar"

    context_1 = dialogflow.types.context_pb2.Context(
        name=context_name,
        lifespan_count=2,
        parameters=parameters
    )
    query_params_1 = {"contexts": [context_1]}

    response = detect_intent_with_parameters(
        project_id=GOOGLE_PROJECT_ID,
        session_id=session_id,
        query_params=query_params_1,
        language_code=language_code,
        user_input=input_text
    )
    return response


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
        result = get_raw_response(input_value.msg, language_code)
        result_action = result.query_result.action
        print("Action =", result_action)
        if result_action in simple_responses:
            return result.query_result.fulfillment_text
        elif result_action in process_responses:
            return process_query(result, input_value, user_id)
        else:
            return "Not found command error"
    else:
        try:
            result = get_raw_response(input_value.msg, language_code)
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


def get_chat_room_name(chat_room):
    return 'chat_%s' % chat_room


def process_query(query, input_value: ChatMessage, user_id=None):
    query_action = query.query_result.action
    if query_action == 'input.support-redirect':
        try:
            ticket = QuestionTicket.objects.get(
                requested_chat_room=input_value.chat_room,
                owner=input_value.owner,
            )
            return 'Wait!. Ticket aleary created with id: ' + str(ticket.pk)
        except QuestionTicket.DoesNotExist:
            ticket = QuestionTicket.objects.create(
                requested_chat_room=input_value.chat_room,
                requested_chat_message=input_value,
                msg='',
                owner=input_value.owner,
            )
            new_chat_room = ChatRoom.objects.create(
                bot_chat_id = input_value.chat_room.bot_chat_id,
                title = 'Ticket to ' + input_value.chat_room.title,
                owner = get_bot(),
            )
            return f'/redirect to {new_chat_room.pk}'
    elif query_action == 'input.support-student-creds':
        output_raw_txt = str(query.query_result.fulfillment_text)
        output_raw_txt = output_raw_txt.replace('{','{{')
        output_raw_txt = output_raw_txt.replace('}','}}')
        user = User.objects.get(id=user_id)
        student = Student.objects.get(user=user)
        context = {
            'student': student,
        }
        student_results = Result.objects.filter(student = student, semester = AcademicSession.objects.last())
        current_total_score = sum([result.total_marks for result in student_results])
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



