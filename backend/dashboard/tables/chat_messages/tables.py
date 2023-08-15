import django_tables2 as tables
import django_filters
from chat.models import ChatMessage  # Replace ChatMessage with your specific model name

class ChatMessageTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:chatmessage_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:chatmessage_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    class Meta:
        model = ChatMessage
        fields = ['id','chat_room','owner','recipient','created_at','updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class ChatMessageFilter(django_filters.FilterSet):
    class Meta:
        model = ChatMessage
        fields = ['id','chat_room','owner','recipient']