from rest_framework import serializers
from academics.models import SubjectGroup, get_current_academic_config
from dashboard.serializers import UserSerializer, User
from dashboard.tables.subjects.serializers import SubjectSerializer, Subject
from dashboard.models import get_students_with_initial_test
from utils.serializers import TimestampedSerializer


class SubjectGroupSerializer(TimestampedSerializer):
    teacher = UserSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
    )
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )

    class Meta:
        model = SubjectGroup
        fields = ('id', 'semester', 'subject', 'subject_id',
                  'teacher', 'teacher_id', 'created_at', 'updated_at')

    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        teacher = validated_data.pop('teacher_id', None)
        semester = get_current_academic_config()
        quiz = SubjectGroup.objects.create(
            **validated_data, semester=semester, teacher=teacher, subject=subject)
        return quiz

    def update(self, instance: User, validated_data):
        subject = validated_data.pop('subject_id', None)
        teacher = validated_data.pop('teacher_id', None)
        semester = validated_data.pop('semester', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.subject_id = subject.pk
        instance.teacher_id = teacher.pk
        instance.save()
        return instance


class SubjectGroupAssignSerializer(TimestampedSerializer):
    teacher = UserSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
    )
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )

    class Meta:
        model = SubjectGroup
        fields = ('id', 'semester', 'subject', 'subject_id',
                  'teacher', 'teacher_id', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        teacher = validated_data.pop('teacher_id', None)
        semester = get_current_academic_config()
        quiz = SubjectGroup.objects.create(
            **validated_data, semester=semester, teacher=teacher, subject=subject)
        return quiz

    # def update(self, instance: User, validated_data):
    #     subject = validated_data.pop('subject_id', None)
    #     teacher = validated_data.pop('teacher_id', None)
    #     semester = validated_data.pop('semester', None)
    #     for key, value in validated_data.items():
    #         setattr(instance, key, value)
    #     instance.subject_id = subject.pk
    #     instance.teacher_id = teacher.pk
    #     instance.save()
    #     return instance