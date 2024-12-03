from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from apps.notification_system.signals import notify
from utils.stats_views import AbstractStatsView
from apps.academics.models import get_current_academic_config
from apps.students.models import Student
from apps.results.models import Result
from apps.exams.models import Exam
from apps.dashboard.models import get_teacher_exams_queryset, get_teacher_students_queryset
from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from .serializers import ExamSerializer, ExamPassStatsRequestSerializer, ExamPassStatsDataSerializer
from .filters import ExamPagination, ORDERING_FIELDS, ExamFilter, SEARCH_FILTERSET_FIELDS


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ExamFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = ExamPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            return Exam.objects.all()
        return get_teacher_exams_queryset(self.request.user)

    def create_attendance_results(self, exam: Exam):
        students_list = Student.objects.filter(current_status='active')
        for student in students_list:
            result, created = Result.objects.get_or_create(
                student=student,
                exam=exam,
            )
            if created:
                result.attendance = False
                result.checked = False
                result.save()

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        exam: Exam = serializer.save()
        notification_context = [
            f"New exam available: Exam({exam.pk})"
        ]
        subject = exam.subject
        group_names = get_loaded_group_names(self.request.user)
        if 'teacher' in group_names:
            students = get_teacher_students_queryset(
                self.request.user).filter(current_group__subject=subject)
        elif 'admin' in group_names:
            students = Student.objects.filter(current_group__subject=subject)
        for recipient_student in students:
            notify.send(
                self.request.user,
                recipient=recipient_student.user,
                level='info',
                verb='new_exam',
                description='\n'.join(notification_context),
            )
        self.create_attendance_results(exam)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ExamPassStats(AbstractStatsView):
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]
    serializer_class = ExamPassStatsRequestSerializer

    def get_queryset(self, validated_data):
        exam = validated_data.pop('exam_id')
        return Result.objects.filter(exam=exam)

    def get_results_data(self, validated_data, exam_results_queryset):
        current_academic_config = get_current_academic_config()
        exam_results_total_count = exam_results_queryset.count()
        exam_students_attendance_count = exam_results_queryset.filter(
            attendance=True).count()
        exam_students_absent_count = exam_results_total_count - \
            exam_students_attendance_count
        passed_count = exam_results_queryset.filter(
            theory_score__gt=current_academic_config.assign_groups_theory_min, attendance=True).count()
        failed_count = exam_students_attendance_count - passed_count
        context = {
            'chart_data':
            {
                'attendance_data': {
                    "passed_count": passed_count,
                    "absent_count": exam_students_absent_count,
                    "failed_count": failed_count,
                },
            },
            'table_data': ExamPassStatsDataSerializer(exam_results_queryset, many=True).data,
            'min_score': current_academic_config.assign_groups_theory_min,
        }
        return context
