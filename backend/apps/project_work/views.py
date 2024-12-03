from django.contrib.auth.hashers import check_password
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.generics import (CreateAPIView, ListCreateAPIView,
                                     RetrieveDestroyAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.academics.models import get_current_academic_config
from .filters import ProjectDeviceStreamPagination
from .permissions import IsDeviceOwner, IsProjectOwner, get_loaded_group_names
from .serializers import *


# from apps.project_work.operations import FileChecker


class PracticalWorkListMyView(ListCreateAPIView):
    queryset = PracticalWork.objects.all()
    serializer_class = PracticalWorkSerializer
    permission_classes = [
        permissions.IsAuthenticated,]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, ]
    filterset_fields = ['status']
    ordering_fields = ['id']

    def get_queryset(self):
        queryset = PracticalWork.objects.prefetch_related(
            'shared_students').all()
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names or 'teacher' in group_names:
            pass
        else:
            student = self.request.user.student
            queryset = queryset.filter(student=student)
        return queryset

    def get_serializer_context(self):
        constext = super().get_serializer_context()
        constext['request'] = self.request
        return constext

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = request.user.student
        if student and not student.current_group:
            if student.project_works.count() > 0:
                return Response({'success': False, 'detail': "At first, select subject group"},
                                status=status.HTTP_403_FORBIDDEN)
        elif student and student.current_group:
            LIMIT = 10
            if student.project_works.count() > LIMIT:
                return Response({'success': False, 'detail': f"Limit for projects is {LIMIT}"},
                                status=status.HTTP_403_FORBIDDEN)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PracticalWorkSubmitView(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        serilizer = PracticalWorkSubmitSerializer(data=request.data)
        serilizer.is_valid(raise_exception=True)
        validated_data = serilizer.validated_data
        instance: PracticalWork = validated_data.get('project_id')
        exam_instance = validated_data.get('exam_id')
        instance.status = 'pending'
        instance.submit_exam = exam_instance
        instance.save()
        return Response({"success": True}, status=status.HTTP_200_OK)


class PracticalWorkRetrieveView(RetrieveUpdateDestroyAPIView):
    queryset = PracticalWork.objects.all()
    serializer_class = PracticalWorkSerializer
    permission_classes = [
        permissions.IsAuthenticated, IsProjectOwner]

    def get_serializer_context(self):
        constext = super().get_serializer_context()
        constext['request'] = self.request
        return constext


class PracticalWorkFileUploadView(CreateAPIView):
    queryset = FileModel.objects.all()
    serializer_class = FileSerializer
    permission_classes = [
        permissions.IsAuthenticated, IsProjectOwner]

    def get_serializer_context(self):
        constext = super().get_serializer_context()
        constext['request'] = self.request
        return constext

    def create(self, request, *args, **kwargs):
        project_work_instance = get_object_or_404(
            PracticalWork, pk=self.kwargs['project_work_id'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        project_work_instance.files.add(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PracticalWorkFileDeleteView(RetrieveDestroyAPIView):
    queryset = PracticalWork.objects.all()
    permission_classes = [
        permissions.IsAuthenticated, IsProjectOwner]

    def get_serializer_context(self):
        constext = super().get_serializer_context()
        constext['request'] = self.request
        return constext

    def destroy(self, request, *args, **kwargs):
        project_work_instance = get_object_or_404(
            PracticalWork, pk=self.kwargs['project_work_id'])
        self.check_object_permissions(self.request, project_work_instance)
        file_instance = project_work_instance.files.get(pk=self.kwargs['pk'])
        project_work_instance.files.remove(file_instance)
        self.perform_destroy(file_instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class PracticalWorkFileCodeCreateView(CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated, IsProjectOwner]

    def create(self, request, *args, **kwargs):
        project_work_instance = get_object_or_404(
            PracticalWork, pk=self.kwargs['project_work_id'])
        self.check_object_permissions(self.request, project_work_instance)
        serializer = PracticalWorkFileCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['code']
        new_file_name = 'code.cpp'
        new_file_content = ContentFile("" if code is None else str(code))
        new_file_instance = FileModel.file.field.generate_filename(
            None, new_file_name)
        new_file_path = FileModel.file.field.storage.save(
            new_file_instance, new_file_content)
        file_instance = FileModel.objects.create(file=new_file_path)
        project_work_instance.files.add(file_instance)
        headers = self.get_success_headers(serializer.data)
        return Response(FileSerializer(file_instance, context={
            'request': request
        }).data, status=status.HTTP_201_CREATED, headers=headers)


class PracticalWorkFileCodeRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated, IsProjectOwner]

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        project_work_instance = get_object_or_404(
            PracticalWork, pk=self.kwargs['project_work_id'])
        self.check_object_permissions(self.request, project_work_instance)
        file_instance = project_work_instance.files.get(pk=self.kwargs['pk'])
        if not file_instance:
            return Response({'detail': 'File not found in project.'}, status=status.HTTP_404_NOT_FOUND)
        if file_instance.extension != '.cpp':
            return Response({'detail': 'File not supported.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = PracticalWorkFileCodeSerializer(
            file_instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get('code', None)
        if code is not None:
            with open(file_instance.file.path, 'w') as file:
                file.write(code)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        project_work_instance = get_object_or_404(
            PracticalWork, pk=self.kwargs['project_work_id'])
        self.check_object_permissions(self.request, project_work_instance)
        file_instance = project_work_instance.files.get(pk=self.kwargs['pk'])
        with open(file_instance.file.path, 'r') as file:
            code = file.read()
        return Response({'code': code}, status=status.HTTP_200_OK)


class ProjectDeviceStreamView(ListCreateAPIView):
    queryset = ProjectDeviceSensorDataSubmit.objects.all()
    serializer_class = ProjectDeviceSensorDataSubmitSerializer
    pagination_class = ProjectDeviceStreamPagination

    def post(self, request, pk):
        device = get_object_or_404(ProjectDevice, pk=pk).select_related(
            'practical_work', 'script')
        serializer = ProjectDeviceSensorDataSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        if not check_password(validated_data.pop('password'), device.password):
            return Response({"success": False, "detail": "Not found device with these credentials.", },
                            status=status.HTTP_401_UNAUTHORIZED)
        if not device.activated:
            return Response({"success": False, "detail": "Please activate device.", },
                            status=status.HTTP_401_UNAUTHORIZED)
        sensors_validated_data_list = validated_data.pop(
            'sensor_data_list', [])
        sensor_data_submit_count = ProjectDeviceSensorDataSubmit.objects.filter(
            device=device).count()
        if sensor_data_submit_count > 0:
            last_config = get_current_academic_config()
            if sensor_data_submit_count > last_config.project_work_device_requests_limit:
                return Response(
                    {"success": False, "detail": "Requests limit for this device exhausted. Please renew manually.", },
                    status=status.HTTP_403_FORBIDDEN)
            last_entry = ProjectDeviceSensorDataSubmit.objects.filter(
                device=device).last()
            if last_entry:
                time_difference = timezone.now() - last_entry.updated_at
                if time_difference < timezone.timedelta(seconds=20):
                    return Response(
                        {"success": False, "detail": "Too many requests. Please wait before making another request.", },
                        status=status.HTTP_403_FORBIDDEN)
        sensor_data_labels: list[ProjectDeviceLabel] = device.sensor_data_labels.all(
        )
        sensor_data_labels_str_list = [i.field for i in sensor_data_labels]
        for item in sensors_validated_data_list:
            if not item['field'] in sensor_data_labels_str_list:
                return Response(
                    {"success": False, "detail": f"key field {item['field']} is not in device data labels.", },
                    status=status.HTTP_400_BAD_REQUEST)
        submit = ProjectDeviceSensorDataSubmit.objects.create(device=device)
        for item in sensors_validated_data_list:
            for j in sensor_data_labels:
                if j.field == item['field']:
                    ProjectDeviceSensorData.objects.create(
                        submit=submit, value=item['value'], label=j)
        return Response({'success': True}, status=status.HTTP_200_OK)

    def get_queryset(self):
        device = get_object_or_404(ProjectDevice, pk=self.kwargs.get('pk'))

        return device.submits.order_by('-id')


# if device.activated:
#     time_difference = timezone.now() - device.activated_at
#     if time_difference > timezone.timedelta(minutes=2):
#         last_submit: ProjectDeviceSensorDataSubmit = device.submits.last()
#         if last_submit:
#             time_difference = timezone.now() - last_submit.updated_at
#             if time_difference > timezone.timedelta(minutes=1):
#                 device.activated = False
#                 device.save()
# class PracticalWorkShareView(APIView):
#     queryset = PracticalWork.objects.all()
#     serializer_class = ProjectWorkShareSerializer
#
#     permission_classes = [
#         permissions.IsAuthenticated, IsStudentOrTeacherOrAdmin,]


#     def perform_update(self, serializer):
#         prev_instance: PracticalWork = self.get_object()
#         instance: PracticalWork = super().perform_update(serializer)
#         # if prev_instance.shared_students.values_list('id',flat=True) == instance.shared_students:
#         #     recipients = instance.shared_students.exclude(student__in = prev_instance.shared_students)
#         #     notify.send(self.request.user, recipient=recipients,
#         #                 description='Project shared', target=instance, verb='project_share')

#     def get_queryset(self):
#         queryset = PracticalWork.objects.all()
#         group_names = get_loaded_group_names(self.request.user)
#         if 'admin' in group_names or 'teacher' in group_names:
#             pass
#         else:
#             student = self.request.user.student
#             queryset = queryset.filter(student=student)
#         return queryset.select_related('student', 'device', 'conference').prefetch_related('files')


# class PracticalWorkDocFileCheckView(APIView):
#
#     permission_classes = [permissions.IsAuthenticated,
#                           IsStudentOrTeacherOrAdmin, IsProjectOwner]

#     def post(self, request, pk, file_pk):
#         practical_work = get_object_or_404(PracticalWork, pk=pk)
#         practical_work_file = get_object_or_404(FileModel, pk=file_pk)
#         self.check_object_permissions(request, practical_work)
#         if practical_work_file.extension != '.docx':
#             return Response({'detail': 'File is not acceptable.'}, status=status.HTTP_400_BAD_REQUEST)
#         checker = FileChecker()
#         is_success_open, errors = checker.read_dox_file(
#             practical_work_file.file.path)
#         if not is_success_open:
#             return Response({'detail': str(errors)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         checker.validate_docx_file()
#         return Response(checker.get_errors(), status=status.HTTP_200_OK)


class ProjectDeviceView(viewsets.ModelViewSet):
    queryset = ProjectDevice.objects.all()
    serializer_class = ProjectDeviceSerializer

    permission_classes = [
        permissions.IsAuthenticated, IsDeviceOwner, ]

    def get_queryset(self):
        queryset = ProjectDevice.objects.all()
        return queryset.prefetch_related('sensor_data_labels')

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
