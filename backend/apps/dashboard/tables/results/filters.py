from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
import django_filters
from apps.results.models import Result


class ResultPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'checked': ['exact',],
    'attendance': ['exact',],
    'student__current_group__id': ['exact',],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id', 'checked', 'created_at', 'updated_at', 'score',
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'total_score': ['exact', 'icontains'],
    'student__user__username': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}


class ResultFilter(django_filters.FilterSet):
    feedback__isnull = django_filters.BooleanFilter(
        field_name='feedback', lookup_expr='isnull', label='Feedback is None')
    id = django_filters.CharFilter(lookup_expr='icontains')
    student = django_filters.CharFilter(
        field_name='student__user__username', lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    attendance = django_filters.BooleanFilter()
    checked = django_filters.BooleanFilter()
    total_score = django_filters.CharFilter(lookup_expr='icontains')
    subject_group = django_filters.CharFilter(
        field_name='student__current_group_id', lookup_expr='exact')

    class Meta:
        model = Result
        fields = ['id',  'created_at', 'updated_at', 'exam', 'student', 'subject_group',
                  'total_score', 'checked', "feedback", 'attendance']
