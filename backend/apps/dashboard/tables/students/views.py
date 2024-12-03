from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions

from apps.accounts.groups import AdminGroup
from apps.accounts.permissions import IsTeacherOrAdmin
from apps.dashboard.models import get_teacher_students_queryset
from apps.students.models import Student
from .filters import StudentPagination, ORDERING_FIELDS, StudentFilter, SEARCH_FILTERSET_FIELDS
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = StudentFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = StudentPagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = Student.objects.all()
        group_ids = self.request.user.groups.values_list('id', flat=True)
        if AdminGroup.id in group_ids:
            pass
        else:
            queryset = get_teacher_students_queryset(self.request.user)
        return queryset.select_related('user', 'current_group__subject')
