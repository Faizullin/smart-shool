from rest_framework import serializers
from exams.models import Exam, Quiz, Question, Answer
from utils.serializers import TimestampedSerializer


class QuestionAnswerSerializer(TimestampedSerializer):
    question = serializers.SerializerMethodField(read_only=True)
    correct = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Answer
        fields = ('id', 'question', 'content',
                  'correct', 'created_at', 'updated_at')

    def get_question(self, obj):
        return obj.question.id


class QuestionSerializer(TimestampedSerializer):
    answers = QuestionAnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'answers', 'answers_count',
                  'created_at', 'updated_at')


class QuizExamSerializer(TimestampedSerializer):
    class Meta:
        model = Exam
        fields = ('id', 'exam_type', 'created_at', 'updated_at')


class QuizSerializer(TimestampedSerializer):
    exam_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=True, queryset=Exam.objects.all())
    exam = QuizExamSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'duration_time', 'exam', 'exam_id',
                  'questions_count', 'created_at', 'updated_at')

    def create(self, validated_data):
        exam = validated_data.pop('exam_id')
        quiz = Quiz.objects.create(**validated_data,
                                   exam_id=exam.pk)
        return quiz

    def update(self, instance: Quiz, validated_data):
        exam = validated_data.pop('exam_id')
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.exam_id = exam.pk
        instance.save()
        return instance
