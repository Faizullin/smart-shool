from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.http import Http404
import django_filters
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import Group
from datetime import datetime
from .models import *
from .serializers import *
from accounts.permissions import *
from accounts_face_recognition.operations import start_train_by_student


class StudentListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


class StudentFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(lookup_expr='icontains')
    email = django_filters.CharFilter(lookup_expr='icontains')
    group = django_filters.CharFilter(
        field_name='group__name', lookup_expr='icontains')

    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'user__email', 'group']


class StudentListCreateView(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = StudentFilter
    ordering_fields = ['id', 'created_at', 'updated_at']
    ordering = ['-id']
    pagination_class = StudentListPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class StudentRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class StudentRetrieveMe(APIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    authentication_classes = [JWTAuthentication, ]

    def get_object(self, pk):
        try:
            return Student.objects.filter(user_id=pk).first()
        except Student.DoesNotExist:
            raise Http404

    def get_permissions(self):
        self.permission_classes = [permissions.IsAuthenticated,]
        if self.request.method != 'POST':
            self.permission_classes = [permissions.IsAuthenticated, IsStudent]
        return super().get_permissions()

    def get(self, request):
        instance = self.get_object(request.user.pk)
        serializer = StudentSerializer(instance)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentProfileEditSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            instance = serializer.save()
            instance.user.groups.add(Group.objects.get(name='student'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        student = self.get_object(request.user.pk)
        serializer = StudentProfileEditSerializer(
            student, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentTrainFaceMe(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsStudent,)

    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk):
        try:
            return Student.objects.filter(user_id=pk).first()
        except Student.DoesNotExist:
            raise Http404

    def post(self, request):
        images = request.FILES.getlist('images')
        student = self.get_object(request.user.pk)
        today = datetime.now()
        if len(images) == 3:
            for image in images:
                photo_data = {}
                photo_data["student"] = student.pk
                photo_data["train_face_image"] = image
                photo_serializer = StudentTrainFaceImageSerializer(
                    data=photo_data)
                photo_serializer.is_valid(raise_exception=True)
                photo_serializer.save()

            result = start_train_by_student(student)

            student_id = student.pk
            return Response({'success': result}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Please provide exactly three images.'}, status=status.HTTP_400_BAD_REQUEST)
