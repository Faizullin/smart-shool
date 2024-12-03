from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.academics.models import SubjectGroup
from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.dashboard.models import get_teacher_subject_groups_queryset
from apps.dashboard.tables.results.serializers import Result, ResultSerializer
from apps.students.models import Student

from .filters import (ORDERING_FIELDS, SubjectGroupAssignPagination,
                      SubjectGroupFilter, SubjectGroupPagination)
from .serializers import (SubjectGroupAssignRequestSerializer,
                          SubjectGroupSerializer, SubjectIdsRequestSerializer)


def get_student_results_with_initial_test(results_queryset=None):
    if results_queryset is None:
        results_queryset = Result.objects.filter(
            exam__exam_type='i',
            student__current_group__isnull=True,
        )
    return results_queryset


class SubjectGroupViewSet(viewsets.ModelViewSet):
    queryset = SubjectGroup.objects.all()
    serializer_class = SubjectGroupSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = SubjectGroupFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubjectGroupPagination

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = SubjectGroup.objects.all()
        group_names = get_loaded_group_names(self.request.user)
        if ' teacher' in group_names:
            queryset = get_teacher_subject_groups_queryset(self.request.user)
        return queryset.select_related('subject',).all()

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):  # Check if the data is a list
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SubjectGroupAssignView(APIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    pagination_class = SubjectGroupAssignPagination
    permission_classes = (permissions.IsAuthenticated, IsTeacherOrAdmin,)

    def get(self, request):
        subject_group_ids_serializer = SubjectIdsRequestSerializer(
            data=request.query_params)
        if subject_group_ids_serializer.is_valid():
            subject_group_ids = subject_group_ids_serializer.validated_data.get(
                'subject_ids', [])
            if subject_group_ids:
                results_queryset = Result.objects.filter(
                    exam__subject_id__in=subject_group_ids)
                queryset = get_student_results_with_initial_test(
                    results_queryset)
            else:
                queryset = get_student_results_with_initial_test()
            return Response({"results": ResultSerializer(queryset, many=True).data})
        else:
            return Response(subject_group_ids_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = SubjectGroupAssignRequestSerializer(
            data=request.data, many=True)
        if serializer.is_valid():
            data_list = serializer.validated_data
            instances_to_update = []
            for data in data_list:
                instance = data['student_id']
                try:
                    instance.current_group = data['subject_group_id']
                    instances_to_update.append(instance)
                except Student.DoesNotExist:
                    return Response(f"Student with ID {instance.pk} does not exist", status=404)
            if instances_to_update:
                Student.objects.bulk_update(
                    instances_to_update, fields=['current_group'])
            return Response({
                'message': "updated succesfully"
            })
        else:
            return Response(serializer.errors, status=400)
