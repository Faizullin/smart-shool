from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.results.models import StudentAnswer


class StudentAnswerPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StudentAnswerFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    result = django_filters.CharFilter(
        field_name='result_id', lookup_expr='exact')
    student = django_filters.CharFilter(
        field_name='student__user__username', lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = StudentAnswer
        fields = ['id', 'score', 'student',
                  'result', 'created_at', 'updated_at', ]


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
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
