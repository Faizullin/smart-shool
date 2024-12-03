from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.conferences.models import VideoConference


class ConferencePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ConferenceFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    title = django_filters.CharFilter(lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    planned_time = django_filters.CharFilter(lookup_expr='icontains')
    status = django_filters.CharFilter(lookup_expr='exact')
    subject_group = django_filters.CharFilter(
        field_name='users__student__current_group_id', lookup_expr='exact')

    class Meta:
        model = VideoConference
        fields = ['id', 'title', 'created_at',
                  'updated_at', 'status', 'planned_time', 'subject_group']


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'title': ['exact', 'icontains'],
    'status': ['exact'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id', 'planned_time', 'created_at', 'updated_at'
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'title': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
