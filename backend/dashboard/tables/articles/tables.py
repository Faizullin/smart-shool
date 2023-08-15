import django_tables2 as tables
import django_filters
from articles.models import Article  # Replace Article with your specific model name

class ArticleTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item" href="{% url \'dashboard:article_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:article_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    class Meta:
        model = Article
        fields = ["id","title", "subject", "status","created_at","updated_at"]
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class ArticleFilter(django_filters.FilterSet):
    class Meta:
        model = Article
        fields = ["id","title", "subject", "status"]