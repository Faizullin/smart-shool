from rest_framework import viewsets, filters, permissions

from django_filters.rest_framework import DjangoFilterBackend
from apps.dashboard.models import {ModelName}
from .serializers import {ModelName}Serializer
from .filters import {ModelName}Pagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsAdmin


class {ModelName}ViewSet(viewsets.ModelViewSet):
    queryset = {ModelName}.objects.all()
    serializer_class = {ModelName}Serializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = {ModelName}Pagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
