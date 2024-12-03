from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from apps.conferences.models import VideoConference
from apps.exams.models import Exam
from apps.file_system.models import File as FileModel
from apps.students.models import Student
from utils.serializers import TimestampedSerializer
from .models import (PracticalWork, ProjectDevice, ProjectDeviceLabel,
                     ProjectDeviceSensorData, ProjectDeviceSensorDataSubmit)

User = get_user_model()


class FileSerializer(TimestampedSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(read_only=True)
    extension = serializers.CharField(read_only=True)
    size = serializers.IntegerField(read_only=True)
    file = serializers.FileField()

    class Meta:
        model = FileModel
        fields = ('id', 'name', 'extension', 'size', 'url', 'file',
                  'created_at', 'updated_at')

    def get_url(self, obj: FileModel):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if obj.file else ""


class ProjectDeviceLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDeviceLabel
        fields = ['id', 'field', 'label']


class ProjectDeviceSerializer(TimestampedSerializer):
    script_id = serializers.PrimaryKeyRelatedField(
        queryset=FileModel.objects.all(), write_only=True
    )
    practical_work_id = serializers.PrimaryKeyRelatedField(
        queryset=PracticalWork.objects.all(), write_only=True, required=True
    )
    script = FileSerializer(read_only=True)
    activated = serializers.BooleanField(required=False)
    sensor_data_labels = ProjectDeviceLabelSerializer(many=True)

    class Meta:
        model = ProjectDevice
        fields = ('id', 'title', 'script', 'script_id', 'practical_work_id', 'sensor_data_labels',
                  'created_at', 'updated_at', 'activated')

    def create(self, validated_data):
        script = validated_data.pop('script_id')
        practical_work = validated_data.pop('practical_work_id')
        sensor_data_labels = validated_data.pop('sensor_data_labels', [])
        instance: ProjectDevice = ProjectDevice.objects.create(
            **validated_data, script=script, practical_work=practical_work)
        for item in sensor_data_labels:
            ProjectDeviceLabel.objects.create(**item, device=instance)
        return instance

    def update(self, instance: ProjectDevice, validated_data, ):
        title = validated_data.pop('title', None)
        script = validated_data.pop('script_id', None)
        activated = validated_data.pop('activated', None)
        if title is not None:
            instance.title = title
        if script is not None:
            instance.script = script
        if activated is not None:
            instance.activated = activated
            if instance.activated:
                instance.activated_at = timezone.now()
        instance.save()
        return instance


class ConferenceSerializer(TimestampedSerializer):
    class Meta:
        model = VideoConference
        fields = ['id', 'status', ]


class PracticalWorkSerializer(TimestampedSerializer):
    files = FileSerializer(many=True, read_only=True)
    files_ids = serializers.PrimaryKeyRelatedField(
        queryset=FileModel.objects.all(), write_only=True, many=True, required=False
    )
    device = serializers.SerializerMethodField(read_only=True)
    conference = ConferenceSerializer(read_only=True)

    class Meta:
        model = PracticalWork
        fields = ['id', 'title', 'files', 'files_ids',
                  'created_at', 'updated_at', 'status', 'device', 'conference']

    def create(self, validated_data):
        files = validated_data.pop('files_ids', [])
        student = self.context['request'].user.student
        instance = PracticalWork.objects.create(
            **validated_data, student=student)
        if files and len(files) > 0:
            instance.files.set(files)
        return instance

    def update(self, instance: PracticalWork, validated_data):
        files_ids = validated_data.pop('files_ids', [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if files_ids and len(files_ids) > 0:
            instace_files_ids = instance.files.values_list('id', flat=True)
            total_size = sum([int(i.size) for i in files_ids])
            if total_size > 20 * 1024 * 1024:
                delete_files_ids = []
                for i in files_ids:
                    if not i.id in instace_files_ids:
                        delete_files_ids.append(i.id)
                FileModel.objects.filter(id__in=delete_files_ids).delete()
                raise serializers.ValidationError(
                    'Limit for files upload is 20MB')
        if files_ids and len(files_ids) > 0:
            instance.files.set(files_ids)
        return instance

    def get_device(self, obj: PracticalWork):
        return None if not hasattr(obj, 'device') else {
            "id": obj.device.pk
        }


class ProjectDeviceSensorDataSerializer(TimestampedSerializer):
    field = serializers.CharField(write_only=True)

    class Meta:
        model = ProjectDeviceSensorData
        fields = ['id', 'value', 'field', 'label_id', ]


class ProjectDeviceSensorDataSubmitSerializer(TimestampedSerializer):
    sensor_data_list = ProjectDeviceSensorDataSerializer(many=True, )
    activated = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProjectDeviceSensorDataSubmit
        fields = ['id', 'sensor_data_list',
                  'created_at', 'updated_at', 'activated']

    def get_activated(self, obj):
        return obj.device.activated


class PracticalWorkFileCodeSerializer(TimestampedSerializer):
    code = serializers.CharField(
        required=False, allow_blank=True, )

    class Meta:
        model = FileModel
        fields = ['id', 'code', 'created_at', 'updated_at']


class PracticalWorkSubmitSerializer(serializers.Serializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=PracticalWork.objects.all(), write_only=True, required=True
    )
    exam_id = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all(), write_only=True, required=True
    )


class SharedStudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class SharedStudentSerializer(serializers.ModelSerializer):
    user = SharedStudentUserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'user']


class ProjectWorkShareSerializer(serializers.ModelSerializer):
    shared_students_ids = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), write_only=True, many=True)
    shared_students = SharedStudentSerializer(read_only=True, many=True)

    class Meta:
        model = PracticalWork
        fields = ['shared_students_ids', 'shared_students']

    def update(self, instance: PracticalWork, validated_data):
        shared_students = validated_data.pop('shared_students_ids', [])
        if shared_students:
            instance.shared_students = shared_students
            instance.save()
        return instance


class ProjectDeviceConsumerSensorDataSerializer(TimestampedSerializer):
    field = serializers.CharField(write_only=True)

    class Meta:
        model = ProjectDeviceSensorData
        fields = ['id', 'value', 'field', 'label_id', ]


class ProjectDeviceSensorDataConsumerSubmitSerializer(TimestampedSerializer):
    sensor_data_list = ProjectDeviceConsumerSensorDataSerializer(many=True, )

    class Meta:
        model = ProjectDeviceSensorDataSubmit
        fields = ['id', 'sensor_data_list', 'created_at', 'updated_at', ]
