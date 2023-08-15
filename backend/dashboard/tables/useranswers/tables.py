import django_tables2 as tables
import django_filters
from exams.models import StudentAnswer


class UserAnswerTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:useranswer_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:useranswer_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = StudentAnswer
        fields = ['id', 'question', 'student','score',
                  'answer', 'created_at', 'updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class UserAnswerFilter(django_filters.FilterSet):
    class Meta:
        model = StudentAnswer
        fields = ['id', 'question', 'student', 'answer',]
