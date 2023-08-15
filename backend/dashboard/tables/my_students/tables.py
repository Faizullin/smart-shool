import django_tables2 as tables
import django_filters
# Replace Student with your specific model name
from students.models import Student
from academics.models import SubjectGroup


class StudentTable(tables.Table):
    actions = tables.TemplateColumn(
        '<div class="dropdown">'
        '<button class="btn btn-secondary dropdown-toggle" type="button" '
        'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        'Actions</button>'
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
        '<a class="dropdown-item edit-button" data-url="{% url \'dashboard:student_edit\' pk=record.pk %}">Edit</a>'
        '</a>'
        '</div>'
        '</div>',
        verbose_name='Actions'
    )

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'current_group', 'user','updated_at']
        attrs = {
            'class': 'table table-hover',
        }
        row_attrs = {
            "data-id": lambda record: record.pk
        }


from accounts.permissions import isUserAdmin, IsTeacher
class BaseFilterSet(django_filters.FilterSet):
    def __init__(self, *args, **kwargs):
        super(BaseFilterSet, self).__init__(*args, **kwargs)

        if IsTeacher(self.request.user):
            self._filter_owned_options()

    def _filter_owned_options(self):
        user = self.request.user
        owned_options = self.filter_data()
        for field_name, filter_ in self.filters.items():
            if isinstance(filter_, django_filters.ChoiceFilter):
                filter_.extra['choices'] = [(value, label) for value, label in filter_.extra['choices'] if value in owned_options]
    
    def filter_data(self, queryset):
        return queryset
                
class StudentFilter(django_filters.FilterSet):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name',
                  'current_group', 'user__email']

    def __init__(self, *args, user=None, **kwargs):
        super(StudentFilter, self).__init__(*args, **kwargs)
        if self.request.user:
            self.filters['current_group'].field.queryset = SubjectGroup.objects.filter(teacher=self.request.user)