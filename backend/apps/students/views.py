from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.filters import OrderingFilter
from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView)

from apps.accounts.permissions import IsStudent
from apps.results.models import Result
from .filters import StudentFilter, StudentListPagination
from .models import Student
from .serializers import StudentMeSerializer, StudentSerializer


class StudentListView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = StudentFilter
    ordering_fields = ['id', 'created_at', 'updated_at']
    ordering = ['-id']
    pagination_class = StudentListPagination
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        student: Student = self.request.user.student
        return queryset.select_related('current_group').filter(current_group_id=student.current_group_id)


class StudentRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class StudentRetrieveMe(RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentMeSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Student.objects.select_related('current_group').prefetch_related(
            'train_face_images',
            Prefetch('results', queryset=Result.objects.filter(
                exam__exam_type='i', attendance=True))
        ).all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj

    # def get_permissions(self):
    #     self.permission_classes = [permissions.IsAuthenticated,]
    #     if self.request.method != 'POST':
    #         self.permission_classes = [permissions.IsAuthenticated, IsStudent]
    #     return super().get_permissions()

    # def post(self, request):
    #     serializer = StudentProfileEditSerializer(
    #         data=request.data, context={'request': request})
    #     if serializer.is_valid():
    #         instance = serializer.save()
    #         instance.user.groups.add(Group.objects.get(name='student'))
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def patch(self, request):
    #     student = self.get_object(request.user.pk)
    #     serializer = StudentProfileEditSerializer(
    #         student, data=request.data, partial=True, context={'request': request})
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
