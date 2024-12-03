from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from apps.academics.models import Subject
from .serializers import SubjectSerializer
from .filters import SubjectPagination, ORDERING_FIELDS, SubjectFilter, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.dashboard.models import get_teacher_subjects_queryset


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = SubjectFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubjectPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            return Subject.objects.all()
        return get_teacher_subjects_queryset(self.request.user)
