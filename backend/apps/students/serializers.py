from rest_framework import serializers

from apps.academics.models import SubjectGroup
from utils.serializers import TimestampedSerializer
from .models import Student


class StudentCurrentGroupSerializer(TimestampedSerializer):
    class Meta:
        model = SubjectGroup
        fields = ['id', 'title', ]


class StudentSerializer(TimestampedSerializer):
    current_group = StudentCurrentGroupSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'current_status',
                  'current_group', 'created_at', 'updated_at', ]


class StudentMeSerializer(TimestampedSerializer):
    hasFaceId = serializers.SerializerMethodField(read_only=True)
    hasInitial = serializers.SerializerMethodField(read_only=True)
    current_group = StudentCurrentGroupSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'current_status', 'current_group', 'created_at', 'updated_at', 'hasInitial', 'hasFaceId']

    def get_hasInitial(self, obj: Student):
        return obj.results.exists()

    def get_hasFaceId(self, obj):
        return obj.train_face_images.count() > 2
