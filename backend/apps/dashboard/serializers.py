from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.file_system.models import File as FileModel
from apps.students.models import Student
from utils.serializers import TimestampedSerializer

User = get_user_model()


class UserSerializer(TimestampedSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'created_at', 'updated_at')


class StudentSerializer(TimestampedSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user', 'created_at', 'updated_at')


class FileSerializer(TimestampedSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FileModel
        fields = ('id', 'name', 'extension', 'size', 'url', 'file',
                  'created_at', 'updated_at')

    def get_url(self, obj: FileModel):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if obj.file else ""


class DiskSpaceSerializer(serializers.Serializer):
    total_space = serializers.IntegerField()
    used_space = serializers.IntegerField()
    free_space = serializers.IntegerField()
    percent_used = serializers.FloatField()
