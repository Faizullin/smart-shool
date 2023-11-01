from rest_framework import serializers
from students.models import Student
from academics.models import Subject, SubjectGroup
from dashboard.serializers import UserSerializer
from utils.serializers import TimestampedSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')


class SubjectGroupSerializer(TimestampedSerializer):
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = SubjectGroup
        fields = ('id', 'title', 'subject', 'created_at', 'updated_at')


class StudentSerializer(TimestampedSerializer):
    user = UserSerializer(read_only=True)
    current_group = SubjectGroupSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user', 'current_group', 'created_at', 'updated_at')
