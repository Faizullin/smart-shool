from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.academics.models import (SubjectGroup, get_current_academic_config,
                              get_current_academic_session)
from apps.dashboard.models import get_students_with_initial_test
from apps.dashboard.serializers import UserSerializer
from apps.dashboard.tables.subjects.serializers import Subject, SubjectSerializer
from apps.students.models import Student
from utils.serializers import TimestampedSerializer

User = get_user_model()


class SubjectGroupSerializer(TimestampedSerializer):
    teacher = UserSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )

    class Meta:
        model = SubjectGroup
        fields = ('id', 'title', 'semester', 'subject', 'subject_id',
                  'teacher', 'teacher_id', 'created_at', 'updated_at')

    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        teacher = validated_data.pop('teacher_id', None)
        semester = get_current_academic_session()
        instance = SubjectGroup.objects.create(
            **validated_data, semester=semester, subject=subject)
        if teacher:
            instance.teacher_id = teacher.pk
        if instance and not instance.title:
            instance.title = f"Group {instance.pk}"
            instance.save()
        instance.save()
        return instance

    def update(self, instance, validated_data):
        subject = validated_data.pop('subject_id', None)
        teacher = validated_data.pop('teacher_id', None)
        semester = validated_data.pop('semester', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.subject_id = subject.pk
        if teacher:
            instance.teacher_id = teacher.pk
        instance.save()
        return instance


class SubjectGroupAssignRequestSerializer(serializers.Serializer):
    subject_group_id = serializers.PrimaryKeyRelatedField(
        queryset=SubjectGroup.objects.all(),
        write_only=True,
    )
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(),
        write_only=True,
    )


class SubjectIdsRequestSerializer(serializers.Serializer):
    subject_ids = serializers.ListField(
        child=serializers.IntegerField(), required=False)
