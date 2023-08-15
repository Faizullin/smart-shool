import django_tables2 as tables
import django_filters
from results.models import Feedback


class FeedbackTable(tables.Table):
    results = tables.TemplateColumn(
        '<div class="dropdown">'
        '<a class="btn btn-secondary" href="{% url \'dashboard:result_list\' %}?exam={{ record.result.exam.pk }}&student={{ record.result.student.pk }}">'
        'Results</a>'
        '</div>',
        verbose_name='Results'
    )
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:feedback_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:feedback_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = Feedback
        fields = ['id', 'result__student', 'result__exam',
                  'watched',  'created_at', 'updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class FeedbackFilter(django_filters.FilterSet):
    class Meta:
        model = Feedback
        fields = ['id', 'result__student', 'result__exam',
                  'content', 'result__student__current_group', 'watched', 'created_at', 'updated_at']
