from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.students.models import Student


class StudentPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StudentFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    username = django_filters.CharFilter(
        field_name='user__username', lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    subject_group = django_filters.CharFilter(
        field_name='current_group_id', lookup_expr='exact')

    class Meta:
        model = Student
        fields = ['id', 'username', 'created_at',
                  'updated_at', 'subject_group']


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'current_group__id': ['exact',],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id', 'created_at', 'updated_at'
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
