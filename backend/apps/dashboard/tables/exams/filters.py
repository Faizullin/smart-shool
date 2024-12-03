from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.exams.models import Exam


class ExamPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ExamFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    exam_type = django_filters.CharFilter(lookup_expr='exact')
    subject = django_filters.CharFilter(
        field_name='subject_id', lookup_expr='exact')
    subject_groups = django_filters.CharFilter(
        field_name='subject_groups__id', lookup_expr='exact')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    quiz__isnull = django_filters.BooleanFilter(
        field_name='quiz', lookup_expr='isnull')

    class Meta:
        model = Exam
        fields = ['id', 'exam_type', 'created_at', 'updated_at',
                  'subject', 'subject_groups', 'quiz__isnull',]


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'subject_groups__id': ['exact',],
    'quiz': ['isnull',],
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
