from rest_framework import serializers
from exams.models import Exam
from academics.models import Subject
from utils.serializers import TimestampedSerializer
from dashboard.tables.quizzes.serializers import QuizSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')


class ExamSerializer(TimestampedSerializer):
    quiz = QuizSerializer(read_only=True)
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
        quiz = Exam.objects.create(**validated_data,
                                   subject_id=subject.pk)
        return quiz

    def update(self, instance: Exam, validated_data):
        subject = validated_data.pop('subject_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.subject_id = subject.pk
        instance.save()
        return instance
