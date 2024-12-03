from rest_framework import serializers
from apps.exams.models import Exam, Quiz
from apps.academics.models import Subject
from utils.serializers import TimestampedSerializer
from apps.dashboard.serializers import StudentSerializer
from apps.students.models import Student
from apps.results.models import Result
from utils.stats_views import AbstractStatsSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')


class ExamQuizSerializer(TimestampedSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'title',
                  'created_at', 'updated_at') #  'questions_count',


class ExamSerializer(TimestampedSerializer):
    quiz = ExamQuizSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Exam
        fields = ('id', 'exam_type', 'subject', 'subject_id',
                  'quiz', 'created_at', 'updated_at')

    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        instance = Exam.objects.create(**validated_data,
                                       subject_id=subject.pk)
        subject_groups = subject.subject_groups.all()
        instance.subject_groups.set(subject_groups)
        return instance

    def update(self, instance: Exam, validated_data):
        subject = validated_data.pop('subject_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.subject_id = subject.pk
        instance.save()
        subject_groups = subject.subject_groups.all()
        instance.subject_groups.set(subject_groups)
        return instance


class ExamPassStatsRequestSerializer(serializers.Serializer):
    exam_id = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all(), required=True)


class ExamPassStatsDataSerializer(TimestampedSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'student', 'theory_score', 'practical_score',
                  'total_score', 'exam', 'updated_at')
