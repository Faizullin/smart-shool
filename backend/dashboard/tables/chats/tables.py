import django_tables2 as tables
import django_filters
from chats.models import ChatRoom


class ChatTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:chat_edit\' pk=record.pk %}">Edit</a>'
        '<a class="dropdown-item" href="{% url \'dashboard:chat_start\' pk=record.pk %}">Start chatting</a>'
        '<form method="post" action="{% url \'dashboard:chat_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = ChatRoom
        fields = ['id','bot_chat_id','title','owner']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class ChatFilter(django_filters.FilterSet):
    class Meta:
        model = ChatRoom
        fields = ['id','bot_chat_id','title','owner',]
