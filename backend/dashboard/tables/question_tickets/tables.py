import django_tables2 as tables
import django_filters
# Replace QuestionTicket with your specific model name
from chats.models import QuestionTicket


class QuestionTicketTable(tables.Table):
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
        fields = ['id', 'requested_chat_room', 'requested_chat_message',
                  'to_chat_room', 'owner', 'status', 'created_at', 'updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class QuestionTicketFilter(django_filters.FilterSet):
    class Meta:
        model = QuestionTicket
        fields = ['id', 'requested_chat_room', 'requested_chat_message',
                  'to_chat_room', 'owner', 'status',]
