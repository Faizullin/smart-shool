from rest_framework import serializers
from .models import *
from PIL import Image
from results.models import Result


class ExamSerializer(serializers.ModelSerializer):
    practical_files_provided = serializers.SerializerMethodField(
        read_only=True)
    theory_passed = serializers.SerializerMethodField(
        read_only=True)
    quiz_id = serializers.SerializerMethodField(
        read_only=True
    )
    subject = serializers.SerializerMethodField(
        read_only=True
    )

    class Meta:
        model = Exam
        fields = ['id', 'exam_type',
                  'practical_files_provided', 'theory_passed', 'subject', 'quiz_id']

    def get_practical_files_provided(self, obj):
        practical_queryset = Practical.objects.filter(
            exam=obj, student_id=self.context['student'].pk)
        if practical_queryset.exists():
            request = self.context.get('request')
            practical = practical_queryset.last()
            path = request.build_absolute_uri(practical.practical_file.url)
            return f'<a href="{path}">{ practical.title }({ practical.practical_file })</a>'
        return False

    def get_subject(self, obj: Exam):
        return str(obj.subject)

    def get_theory_passed(self, obj):
        result_queryset = Result.objects.filter(
            exam=obj, student=self.context['student'])
        return result_queryset.exists()

    def get_quiz_id(self, obj: Exam):
        quiz = Quiz.objects.filter(exam=obj)
        if quiz.exists():
            return quiz.last().pk


class QuizSerializer(serializers.ModelSerializer):
    start_date_time = serializers.SerializerMethodField(read_only=True)
    end_date_time = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'exam', 'title', 'start_date_time',
                  'time', 'end_date_time', 'questions_count']

    def get_start_date_time(self, obj):
        return obj.start_date_time.strftime('%d %B %Y')

    def get_end_date_time(self, obj):
        return obj.end_date_time.strftime('%d %B %Y')


class QuizQuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'content', 'correct',]

    def get_start_date_time(self, obj):
        return obj.start_date_time.strftime('%d %B %Y')

    def get_end_date_time(self, obj):
        return obj.end_date_time.strftime('%d %B %Y')


class QuizQuestionSerializer(serializers.ModelSerializer):
    answers = QuizQuestionAnswerSerializer(many=True, read_only=True)
    question_type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'quiz', 'prompt', 'answers', 'question_type']

    def get_start_date_time(self, obj):
        return obj.start_date_time.strftime('%d %B %Y')

    def get_end_date_time(self, obj):
        return obj.end_date_time.strftime('%d %B %Y')

    def get_question_type(self, obj: Question):
        return obj.type


class AnswerSubmitSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class QuestionSubmitSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    answers = serializers.ListField(
        child=serializers.CharField(),)


class QuizSubmitSerializer(serializers.Serializer):
    questions = QuestionSubmitSerializer(many=True)


class ExamProjectSubmitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Practical
        fields = ['exam', 'student', 'practical_file', 'title']

    def create(self, validated_data):
        student = self.context['request'].student
        validated_data['student'] = student
        return super().create(validated_data)
