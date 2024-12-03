from rest_framework import serializers
from rest_framework.fields import empty
from apps.results.models import Result
from .models import Exam, Quiz, Question, Choice
from apps.project_work.models import PracticalWork


class ExamSerializer(serializers.ModelSerializer):
    submitted_project_work = serializers.SerializerMethodField(
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
        fields = ['id', 'exam_type', 'submitted_project_work',
                  'theory_passed', 'subject', 'quiz_id']

    def get_submitted_project_work(self, obj: Exam):
        if 'student' in self.context.get('loaded_group_names', []):
            student = self.context['request'].user.student
            try:
                project_work = PracticalWork.objects.get(
                    submit_exam=obj, student=student)
                return {
                    'id': project_work.id,
                    'title': project_work.title,
                }
            except PracticalWork.DoesNotExist:
                pass
        return None

    def get_subject(self, obj: Exam):
        return str(obj.subject)

    def get_theory_passed(self, obj):
        if 'student' in self.context.get('loaded_group_names', []):
            student = self.context['request'].user.student
            result_queryset = Result.objects.filter(
                exam=obj, student=student, attendance=True)
            return result_queryset.exists()
        return None

    def get_quiz_id(self, obj: Exam):
        return obj.quiz.id if obj.quiz else None


class QuizSerializer(serializers.ModelSerializer):
    start_date_time = serializers.SerializerMethodField(read_only=True)
    end_date_time = serializers.SerializerMethodField(read_only=True)
    questions_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'exam', 'title', 'start_date_time',
                  'time', 'end_date_time', 'questions_count']

    def get_questions_count(self, obj: Quiz):
        return obj.questions.count()

    def get_start_date_time(self, obj):
        return obj.start_date_time.strftime('%d %B %Y')

    def get_end_date_time(self, obj):
        return obj.end_date_time.strftime('%d %B %Y')


class QuizQuestionChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'content',)


class QuizQuestionSerializer(serializers.ModelSerializer):
    question_type = serializers.SerializerMethodField(read_only=True)
    choices = QuizQuestionChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'quiz', 'prompt', 'choices',
                  'question_type',]

    def get_question_type(self, obj: Question):
        return obj.type


class QuestionSubmitSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all()
    )
    choices = serializers.ListField(
        child=serializers.CharField(),)

    def validate(self, value):
        """
        Custom validation for answers when the question type is "d".
        """
        question = value.get('id')
        answers = value.get('choices', [])
        # if question.type == 'd':
        #     # Iterate through each answer item
        #     for answer_item in answers:
        #         # Assuming the format is "{subquestion.id}-{answer_item.id}"
        #         subquestion_id, answer_id = map(int, answer_item.split('-'))

        #         # Your additional validation logic goes here

        return value


# class DraggableQuestionAnswerSubmitSerializer(serializers.Serializer):
#     uid = serializers.IntegerField(required=True, write_only=True)

#     class Meta:
#         model = Answer
#         fields = ('uid', 'created_at',)


# class DraggableSubQuestionSubmitSerializer(serializers.Serializer):
#     answers = serializers.ListField(
#         child=serializers.IntegerField()
#     )
#     prompt = serializers.CharField(required=True)

#     class Meta:
#         model = DraggableSubQuestion
#         fields = ('id', 'prompt', 'type', 'answers',
#                   'created_at', 'updated_at')


class QuizSubmitSerializer(serializers.Serializer):
    questions = QuestionSubmitSerializer(many=True)
