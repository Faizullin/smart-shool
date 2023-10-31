import django_tables2 as tables
import django_filters
from students.models import Student  # Replace Student with your specific model name

class StudentTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:student_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:student_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    
    initial_score = tables.Column(verbose_name='Inititial Score', accessor='results.theory_marks')
    class Meta:
        model = Student
        fields = ['id','first_name','last_name','user','current_group','initital_score'] # 'initital_score'
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class StudentFilter(django_filters.FilterSet):
    class Meta:
        model = Student
        fields = []