import django_tables2 as tables
import django_filters
from exams.models import Question  # Replace Question with your specific model name

class QuestionTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:question_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:question_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    class Meta:
        model = Question
        fields = ['id','quiz','prompt','type']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class QuestionFilter(django_filters.FilterSet):
    class Meta:
        model = Question
        fields = ['id','quiz','prompt','type']