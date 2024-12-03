from rest_framework import serializers
from apps.exams.models import Exam, Quiz, Question, Choice
from utils.serializers import TimestampedSerializer


class ChoiceSerializer(TimestampedSerializer):
    correct = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Choice
        fields = ('id', 'question_id', 'content',
                  'correct', 'created_at', 'updated_at')


class QuestionListSerializer(TimestampedSerializer):
    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'created_at', 'updated_at',)


class QuestionRetrieveSerializer(TimestampedSerializer):
    subquestions = QuestionListSerializer(read_only=True, many=True)
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'subquestions',
                  'choices', 'created_at', 'updated_at',)


class SubquestionSubmitSerializer(TimestampedSerializer):
    choices = serializers.ListField(
        child=serializers.IntegerField()
    )
    prompt = serializers.CharField(required=True)

    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'choices',
                  'created_at', 'updated_at')

    def to_representation(self, instance: Question):
        data = super().to_representation(instance)
        if instance.answers_count > 0:
            data['choices'] = [instance.choices.values_list('id')]
        else:
            data['choices'] = []
        return data


class ChoiceSubmitSerializer(TimestampedSerializer):
    correct = serializers.BooleanField(default=False, required=False)
    uid = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Choice
        fields = ('uid', 'content', 'correct', )


class QuestionSubmitSerializer(TimestampedSerializer):
    subquestions = SubquestionSubmitSerializer(
        many=True, write_only=True, required=False)
    choices = ChoiceSubmitSerializer(many=True, write_only=True)
    prompt = serializers.CharField(required=True)

    class Meta:
        model = Question
        fields = ('id', 'prompt', 'type', 'choices', 'subquestions',
                  'created_at', 'updated_at',)


class ExamSerializer(TimestampedSerializer):
    class Meta:
        model = Exam
        fields = ('id', 'exam_type', 'created_at', 'updated_at')


class QuizSerializer(TimestampedSerializer):
    exam_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=True, queryset=Exam.objects.all())
    exam = ExamSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'exam', 'exam_id',
                  'created_at', 'updated_at')  # 'questions_count',

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
