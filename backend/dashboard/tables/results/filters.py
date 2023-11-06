from rest_framework.pagination import PageNumberPagination


class ResultPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


FILTERSET_FIELDS = ['checked']
ORDERING_FIELDS = [
    'id', 'checked', 'created_at', 'updated_at', 'score',
]
SEARCH_FILTERSET_FIELDS = {
    'id': ['exact', 'icontains'],
    'total_score': ['exact', 'icontains'],
    'created_at': ['exact', 'year__gte', 'year__lte'],
    'updated_at': ['exact', 'year__gte', 'year__lte'],
}
