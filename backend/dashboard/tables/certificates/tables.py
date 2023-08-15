import django_tables2 as tables
import django_filters
from certificates.models import Certificate  # Replace Certificate with your specific model name

class CertificateTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:certificate_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:certificate_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    class Meta:
        model = Certificate
        fields = ["id","student","subject","image","created_at","updated_at"]
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class CertificateFilter(django_filters.FilterSet):
    class Meta:
        model = Certificate
        fields = ["id","student","subject"]