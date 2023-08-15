import django_tables2 as tables
import django_filters
from accounts_face_recognition.models import StudentTrainFaceImage


class StudentTrainFaceImageTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<form method="post" action="{% url \'dashboard:studenttrainfaceimage_delete\' pk=record.pk %}">'
        '{% csrf_token %}'
        '<button class=" delete-button dropdown-item" type="submit">Delete</button>'
        '</form>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = StudentTrainFaceImage
        fields = ['id', 'student', 'train_face_image',
                  'created_at', 'updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


class StudentTrainFaceImageFilter(django_filters.FilterSet):
    class Meta:
        model = StudentTrainFaceImage
        fields = ['id', 'student']
