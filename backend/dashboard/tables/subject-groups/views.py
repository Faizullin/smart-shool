from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView

from academics.models import SubjectGroup, get_current_academic_config
from dashboard.tables.results.serializers import Result, ResultSerializer
from exams.models import Exam
from students.models import Student
from .serializers import SubjectGroupSerializer, SubjectGroupAssignRequestSerializer, SubjectIdsRequestSerializer
from .filters import SubjectGroupPagination, SubjectGroupAssignPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


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
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubjectGroupPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

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
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsAdmin,)

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
