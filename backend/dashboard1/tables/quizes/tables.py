import django_tables2 as tables
import django_filters
from exams.models import Quiz

class QuizTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item" href="{% url \'dashboard:quiz_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:quiz_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    class Meta:
        model = Quiz
        fields = ['id','exam', 'title' ,'time',  'start_date_time' , 'end_date_time','created_at','updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class QuizFilter(django_filters.FilterSet):
    class Meta:
        model = Quiz
        fields = ['id', 'title' , 'exam', 'time',  'start_date_time' , 'end_date_time',]