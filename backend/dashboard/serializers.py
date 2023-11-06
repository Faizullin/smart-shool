from rest_framework import serializers
from accounts.models import User
from files.models import File as FileModel
from students.models import Student
from utils.serializers import TimestampedSerializer


class UserSerializer(TimestampedSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'created_at', 'updated_at')


class StudentSerializer(TimestampedSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user','created_at', 'updated_at')


class FileSerializer(TimestampedSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FileModel
        fields = ('id', 'name', 'extension', 'size', 'url', 'file',
                  'created_at', 'updated_at')

    def get_url(self, obj: FileModel):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if obj.file else ""
