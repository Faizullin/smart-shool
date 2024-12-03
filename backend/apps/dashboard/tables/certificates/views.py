from rest_framework import viewsets, filters, permissions

from django_filters.rest_framework import DjangoFilterBackend
from apps.certificates.models import Certificate
from .serializers import CertificateSerializer
from .filters import CertificatePagination, ORDERING_FIELDS, CertificateFilter, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = CertificateFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = CertificatePagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = Certificate.objects.all()
        return queryset.select_related('subject', 'image', 'student__user').all()
