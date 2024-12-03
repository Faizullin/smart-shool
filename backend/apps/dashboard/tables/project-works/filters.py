from django_filters import rest_framework as django_filters
from rest_framework.pagination import PageNumberPagination

from apps.project_work.models import PracticalWork


class PracticalWorkPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PracticalWorkFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    title = django_filters.CharFilter(lookup_expr='icontains')
    status = django_filters.CharFilter(lookup_expr='exact')
    subject_group = django_filters.CharFilter(
        field_name='student__current_group__id', lookup_expr='exact')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    has_conference = django_filters.BooleanFilter(
        method='filter_has_project_work')

    class Meta:
        model = PracticalWork
        fields = ['id', 'title', 'subject_group',
                  'status', 'created_at', 'updated_at', 'has_conference']

    def filter_has_project_work(self, queryset, name, value):
        if value:
            return queryset.filter(conference__isnull=False)
        else:
            return queryset.filter(conference__isnull=True)


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'status': ['exact',],
    'student__current_group__id': ['exact',],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id', 'created_at', 'updated_at',
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
