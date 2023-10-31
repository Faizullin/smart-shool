from rest_framework import serializers
from exams.models import Quiz, Question, Answer
from utils.serializers import TimestampedSerializer
# from dashboard.tables.documents.serializers import DocumentSerializer


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


class QuizSerializer(TimestampedSerializer):
    # document_id = serializers.PrimaryKeyRelatedField(
    #     write_only=True, required=True, queryset=Document.objects.all())
    # document = DocumentSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'duration_time', 'questions_count',
                  'quiz_type', 'document', 'document_id', 'created_at', 'updated_at')

    def create(self, validated_data):
        document = validated_data.pop('document_id')
        quiz = Quiz.objects.create(**validated_data,
                                   document_id=document.pk)
        return quiz

    def update(self, instance: Quiz, validated_data):
        document = validated_data.pop('document_id')
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.document_id = document.pk
        instance.save()
        return instance
