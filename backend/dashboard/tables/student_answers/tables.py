import django_tables2 as tables
import django_filters
# Replace StudentAnswer with your specific model name
from exams.models import StudentAnswer


class StudentAnswerTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:studentanswer_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:studentanswer_delete\' pk=record.pk %}">'
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
        fields = ['id', 'student', 'question',
                  'question__type', 'score', 'created_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class StudentAnswerFilter(django_filters.FilterSet):
    class Meta:
        model = StudentAnswer
        fields = ['id', 'student', 'question', 'question__type', 'score']
