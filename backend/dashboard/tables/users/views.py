from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from dashboard.models import User
from .serializers import UserSerializer
from .filters import UserPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = UserPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
