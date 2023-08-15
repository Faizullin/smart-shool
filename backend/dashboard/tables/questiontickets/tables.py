import django_tables2 as tables
import django_filters
# Replace QuestionTicket with your specific model name
from chat.models import QuestionTicket


class QuestionTicketTable(tables.Table):
    results = tables.TemplateColumn(
        '<div class="dropdown">'
            '<a class="btn btn-secondary" href="{% url \'dashboard:chatmessage_list\' %}?id={{ record.requested_chat_message.pk }}">'
                'Message</a>'
        '</div>',
        verbose_name='Results'
    )
    respond = tables.TemplateColumn(
        '<div class="dropdown">'
            '<a class="btn btn-secondary" href="{% url \'dashboard:questionticket_respond\' pk=record.pk %}">'
                'Respond</a>'
        '</div>',
        verbose_name='Send'
    )
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:questionticket_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:questionticket_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = QuestionTicket
        fields = ['id', 'requested_chat_room', 'owner',
                  'status', 'created_at', 'updated_at',]
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class QuestionTicketFilter(django_filters.FilterSet):
    class Meta:
        model = QuestionTicket
        fields = ['id', 'requested_chat_room', 'owner', 'status']
