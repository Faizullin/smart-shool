from django.contrib.auth import get_user_model
from django_filters import rest_framework as django_filters
from rest_framework.pagination import PageNumberPagination

User = get_user_model()


class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserFilter(django_filters.FilterSet):
    ordering = django_filters.OrderingFilter(
        fields=(
            'id', 'username', 'email', 'created_at', 'updated_at',
        )
    )
    class Meta:
        model = User
        fields = {
            'id': ['exact',],
            'username': ['exact', 'contains'],
            'email': ['exact', 'contains'],
            'groups__name': ['exact', ],
            'created_at': ['exact', 'date', 'lt', 'gt'],
            'updated_at': ['exact', 'date', 'lt', 'gt'],
        }