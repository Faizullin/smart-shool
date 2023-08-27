import django_tables2 as tables
import django_filters
from results.models import Result


class ResultTable(tables.Table):
    stats = tables.TemplateColumn(
        '<div class="dropdown">'
        '<a class="btn btn-secondary" href="{% url \'dashboard:result_stats\' pk=record.pk %}">'
        'Stats</a>'
        '</div>',
        verbose_name='Stats'
    )
    student_answers = tables.TemplateColumn(
        '<div class="dropdown">'
        '<a class="btn btn-secondary" href="{% url \'dashboard:studentanswer_list\' %}?question__quiz={{ record.exam.quiz.pk }}&student={{ record.student.pk }}">'
        'Student Answers</a>'
        '</div>',
        verbose_name='Student Answers'
    )
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:result_edit\' pk=record.pk %}">Edit</a>'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:feedback_create\' %}">Оставить отзыв</a>'
        '<form method="post" action="{% url \'dashboard:result_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = Result
        fields = ['id', 'exam', 'student__first_name', 'student__last_name',
                  'semester', 'total_marks', 'checked', "created_at", "updated_at"]
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class ResultFilter(django_filters.FilterSet):
    feedback__isnull = django_filters.BooleanFilter(field_name='feedback', lookup_expr='isnull', label='Feedback is None')
    class Meta:
        model = Result
        fields = ['id', 'exam', 'student', 'student__first_name', 'student__current_group',
                  'student__last_name',  'total_marks', 'checked', "feedback"]
