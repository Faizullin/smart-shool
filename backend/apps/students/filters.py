from rest_framework.pagination import PageNumberPagination
import django_filters.rest_framework as django_filters
from .models import Student


class StudentListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StudentFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(lookup_expr='icontains')
    email = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Student
        fields = ['username', 'email']
