from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.academics.models import SubjectGroup


class SubjectGroupPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class SubjectGroupAssignPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class SubjectGroupFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    title = django_filters.CharFilter(lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    subject = django_filters.CharFilter(
        field_name='subject_id', lookup_expr='exact')
    teacher = django_filters.CharFilter(
        field_name='teacher__username', lookup_expr='icontains')

    class Meta:
        model = SubjectGroup
        fields = ['id', 'title', 'subject',
                  'teacher', 'created_at', 'updated_at',]


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id', 'created_at', 'updated_at'
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'title': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
