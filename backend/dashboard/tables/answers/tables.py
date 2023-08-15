import django_tables2 as tables
import django_filters
from exams.models import Answer  # Replace Answer with your specific model name


class AnswerTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:answer_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:answer_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = Answer
        fields = ['id', 'question', 'content', 'correct']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class AnswerFilter(django_filters.FilterSet):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'content', 'correct', 'question__quiz']
