from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.dashboard.models import get_teacher_students_results_queryset
from apps.dashboard.serializers import StudentSerializer
from apps.results.models import Result
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response
from utils.stats_views import AbstractStatsSerializer, AbstractStatsView

from .filters import ORDERING_FIELDS, ResultFilter, ResultPagination
from .serializers import ResultSerializer, ResultStatsSerializer


class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ResultFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = ResultPagination

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            return Result.objects.all()
        return get_teacher_students_results_queryset(self.request.user)


class ResultStats(AbstractStatsView):

    # permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]
    serializer_class = ResultStatsSerializer
    to_show_avg = {
        'total_score': 'total_score', 'practical_score': 'practical_score', 'theory_score': 'theory_score'
    }
    to_show_count = {'count': 'id'}
    filter_class = ResultFilter

    def get_queryset(self, validated_data):
        queryset = super().get_queryset(validated_data)
        return queryset

    def get_results_data(self, validated_data, queryset):
        student = validated_data.get('student_id', None)
        group_by, format_string = self.get_date_data(
            validated_data=validated_data)
        formatted_data = []
        if student:
            queryset = queryset.filter(student_id=student.id)
        for item in queryset:
            value = {
                'date': self.get_date_str(item[group_by], format_string)
            }
            for key in self.to_show_avg.values():
                value[key] = item[key]
            formatted_data.append(value)
        context = {
            'chart_data': {
                'results_data': formatted_data,
            },
            'current_student': None,
        }
        if student:
            context['current_student'] = StudentSerializer(student).data,
        return context
