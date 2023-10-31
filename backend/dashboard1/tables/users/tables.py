import django_tables2 as tables
import django_filters
from accounts.models import User  # Replace User with your specific model name

class UserTable(tables.Table):
    profile_picture = tables.TemplateColumn(
        '<div class="">'
            '<img src="{% if record.profile_picture %}{{ record.profile_picture.url }}{% endif %}" alt="{% if record.profile_picture %}{{ record.profile_picture.url }}{% endif %}" class="img-thumbnail">'
        '</div>',
    )
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
            '<button class="btn btn-secondary dropdown-toggle" type="button" '
                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                'Actions</button>'
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:user_edit\' pk=record.pk %}">Edit</a>'
                    '<form method="post" action="{% url \'dashboard:user_delete\' pk=record.pk %}">'
                        '{% csrf_token %}'
                        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
                    '</form>'
                '</a>'
            '</div>'
        '</div>',
        verbose_name='Actions'
    )
    
    class Meta:
        model = User
        fields = ("id","username", "email", "approval_status", "date_joined" )
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }
        
        
class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = ['id', 'username','email','approval_status']