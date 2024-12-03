from rest_framework import serializers
from apps.results.models import Result, Feedback
from apps.dashboard.tables.exams.serializers import ExamSerializer
from apps.dashboard.serializers import UserSerializer, Student
from utils.serializers import TimestampedSerializer
from utils.stats_views import AbstractStatsSerializer
from apps.project_work.models import PracticalWork
from apps.academics.models import SubjectGroup


class ResultFeedbackSerializer(TimestampedSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'watched', 'created_at', 'updated_at')


class SubjectGroupSerializer(TimestampedSerializer):
    class Meta:
        model = SubjectGroup
        fields = ('id', 'title', 'created_at', 'updated_at')


class StudentSerializer(TimestampedSerializer):
    user = UserSerializer(read_only=True)
    current_group = SubjectGroupSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user', 'current_group', 'created_at', 'updated_at')


class ResultSerializer(TimestampedSerializer):
    exam = ExamSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    feedback = ResultFeedbackSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'attendance', 'student', 'exam', 'theory_score', 'practical_score', 'feedback',
                  'total_score', 'checked', 'created_at', 'updated_at')

    def update(self, instance: Result, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        if instance.exam and instance.student:
            student_practical_works = PracticalWork.objects.filter(
                submit_exam=instance.exam, student=instance.student, status='pending')
            if len(student_practical_works) == 1:
                student_practical_works[0].status = 'rated'
                student_practical_works[0].save()
            elif len(student_practical_works) > 1:
                raise serializers.ValidationError(
                    "Somethins went wrong on server")
        return instance


class ResultStatsSerializer(AbstractStatsSerializer):
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), required=False)
