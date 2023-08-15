import django_tables2 as tables
import django_filters
from results.models import Result  # Replace Result with your specific model name

class ResultTable(tables.Table):
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
        fields = ['id','exam','student__first_name','student__last_name', 'semester', 'subject__title', 'total_marks',"created_at","updated_at"]
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class ResultFilter(django_filters.FilterSet):
    class Meta:
        model = Result
        fields = ['id','exam','student','student__first_name','student__last_name', 'subject', 'total_marks']