import django_tables2 as tables
import django_filters
from exams.models import Exam  # Replace Exam with your specific model name
from students.models import Student


class ExamTable(tables.Table):
    results = tables.TemplateColumn(
        '<div class="dropdown">'
        '<a class="btn btn-secondary" href="{% url \'dashboard:result_list\' %}?exam={{ record.pk }}">'
        'Results</a>'
        '</div>',
        verbose_name='Results'
    )
    stats = tables.TemplateColumn(
        '<div class="dropdown">'
        '<a class="btn btn-secondary" href="{% url \'dashboard:exam_stats\' pk=record.pk %}">'
        'Stats</a>'
        '</div>',
        verbose_name='Stats'
    )
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:exam_edit\' pk=record.pk %}">Edit</a>'
        '<form method="post" action="{% url \'dashboard:exam_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = Exam
        fields = ['id', 'exam_type', 'exam_date',
                  'subject', 'created_at', 'updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class ExamFilter(django_filters.FilterSet):
    class Meta:
        model = Exam
        fields = ['id', 'exam_type', 'exam_date', 'subject']


class ExamStudentDataTable(tables.Table):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name',
                  'user', 'pass_status', 'total_marks', 'current_group']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
