from rest_framework import viewsets, filters, permissions

from django_filters.rest_framework import DjangoFilterBackend
from apps.results.models import StudentAnswer
from .serializers import StudentAnswerSerializer
from .filters import StudentAnswerPagination, ORDERING_FIELDS, StudentAnswerFilter, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.dashboard.models import get_teacher_students_results_queryset


class StudentAnswerViewSet(viewsets.ModelViewSet):
    queryset = StudentAnswer.objects.all()
    serializer_class = StudentAnswerSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = StudentAnswerFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = StudentAnswerPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            return StudentAnswer.objects.all()
        return StudentAnswer.objects.filter(result__in=get_teacher_students_results_queryset(self.request.user))
