from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from apps.accounts.permissions import IsTeacherOrAdmin

from .filters import (UserFilter,UserPagination)
from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = UserFilter
    pagination_class = UserPagination
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]
