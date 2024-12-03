from rest_framework import viewsets, filters, permissions

from django_filters.rest_framework import DjangoFilterBackend
from apps.file_system.models import File as FileModel
from .serializers import DashboardFileSerializer
from .filters import FilePagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin


class FileViewSet(viewsets.ModelViewSet):
    queryset = FileModel.objects.all()
    serializer_class = DashboardFileSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = FilePagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]
