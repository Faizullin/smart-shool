from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as django_filters
from apps.notification_system.models import Notification


class NotificationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class NotificationFilter(django_filters.FilterSet):
    id = django_filters.CharFilter(lookup_expr='icontains')
    recipient = django_filters.CharFilter(
        field_name='recipient__username', lookup_expr='icontains')
    created_at = django_filters.CharFilter(lookup_expr='icontains')
    updated_at = django_filters.CharFilter(lookup_expr='icontains')
    status = django_filters.BooleanFilter()
    unread = django_filters.BooleanFilter()
    subject_group = django_filters.CharFilter(
        field_name='recipient__student__current_group_id', lookup_expr='exact')

    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'created_at',
                  'updated_at', 'status', 'unread','subject_group']


FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'recipient__student__current_group__id': ['exact',],
    # 'created_at': ['exact', 'year__gte', 'year__lte'],
    # 'updated_at': ['exact', 'year__gte', 'year__lte'],
}
ORDERING_FIELDS = [
    'id',  # 'created_at', 'updated_at'
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    # 'created_at': ['exact', 'year__gte', 'year__lte'],
    # 'updated_at': ['exact', 'year__gte', 'year__lte'],
}
