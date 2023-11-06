from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from exams.models import Exam, Quiz, Question, Answer, DraggableSubQuestion
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
    subquestions = serializers.SerializerMethodField(read_only=True)
    answers = QuestionAnswerSerializer(many=True)
    prompt = serializers.CharField(required=True)

    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'answers', 'answers_count', 'subquestions',
                  'created_at', 'updated_at')

    def get_subquestions(self, obj):
        if obj.type == 'd':
            return DraggableSubQuestionSerializer(obj.draggable_subquestions, many=True).data
        return []


class DraggableSubQuestionSerializer(TimestampedSerializer):
    correct_answers = QuestionAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = DraggableSubQuestion
        fields = ('id', 'prompt', 'source_question_id', 'correct_answers',
                  'created_at', 'updated_at')


class DraggableQuestionAnswerSubmitSerializer(TimestampedSerializer):
    correct = serializers.BooleanField(default=False, required=False)
    uid = serializers.IntegerField(required=True, write_only=True)

    class Meta:
        model = Answer
        fields = ('uid', 'content', 'correct', 'created_at', 'updated_at')

class DraggableSubQuestionSubmitSerializer(TimestampedSerializer):
    answers = serializers.ListField(
        child=serializers.IntegerField()
    )
    prompt = serializers.CharField(required=True)

    class Meta:
        model = DraggableSubQuestion
        fields = ('id', 'prompt', 'type', 'answers', 
                  'created_at', 'updated_at')
    
    def to_representation(self, instance: DraggableSubQuestion):
        data = super().to_representation(instance)
        print(data, instance)
        if instance.answers_count > 0:
            data['answers'] = [instance.asnwers.values_list('id')]
        else:
            data['answers'] = []
        return data


class DraggableQuestionSubmitSerializer(TimestampedSerializer):
    answers = DraggableQuestionAnswerSubmitSerializer(
        many=True, write_only=True)
    subquestions = DraggableSubQuestionSubmitSerializer(many=True, write_only=True)

    class Meta:
        model = DraggableSubQuestion
        fields = ('id', 'prompt', 'source_question_id', 'answers', 'subquestions',
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
