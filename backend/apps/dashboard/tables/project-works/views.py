from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.dashboard.models import get_teacher_students_practicals_queryset
from apps.file_system.models import File as FileModel
from apps.project_work.models import PracticalWork
from apps.project_work.operations import FileChecker

from .filters import (ORDERING_FIELDS, SEARCH_FILTERSET_FIELDS,
                      PracticalWorkFilter, PracticalWorkPagination)
from .serializers import PracticalWorkSerializer


class PracticalWorkViewSet(viewsets.ModelViewSet):
    queryset = PracticalWork.objects.all()
    serializer_class = PracticalWorkSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = PracticalWorkFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = PracticalWorkPagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = PracticalWork.objects.all()
        group_names = get_loaded_group_names(self.request.user)
        if ' teacher' in group_names:
            queryset = get_teacher_students_practicals_queryset(
                self.request.user)
        queryset = queryset.select_related('student', 'submit_exam',).prefetch_related(
            'files', 'shared_students',
            # Prefetch('student__results', queryset=Result.objects.filter(exam_id=F('submit_exam_id')))
        ).order_by('-id')
        # for obj in queryset:
        #     result_queryset = obj.student.results.filter(exam=obj.submit_exam)
        return queryset


class PracticalWorkDocFileCheckView(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def post(self, request, pk, file_pk):
        practical_work = get_object_or_404(PracticalWork, pk=pk)
        practical_work_file = get_object_or_404(FileModel, pk=file_pk)
        self.check_object_permissions(request, practical_work)
        if practical_work_file.extension != '.docx':
            return Response({'detail': 'File is not acceptable.'}, status=status.HTTP_400_BAD_REQUEST)
        checker = FileChecker()
        is_success_open, errors = checker.read_dox_file(
            practical_work_file.file.path)
        if not is_success_open:
            return Response({'detail': str(errors)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        checker.validate_docx_file()
        return Response(checker.errors, status=status.HTTP_200_OK)
