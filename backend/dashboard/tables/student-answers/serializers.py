from rest_framework import serializers
# from rest_polymorphic.serializers import PolymorphicSerializer
from results.models import StudentAnswer, MultipleChoiceStudentAnswer, TextAreaStudentAnswer, Answer
from dashboard.serializers import StudentSerializer, StudentSerializer
from dashboard.tables.quizzes.serializers import QuestionSerializer
from utils.serializers import TimestampedSerializer


class StudentAnswerSerializer(TimestampedSerializer):
    student = StudentSerializer(read_only=True)
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = StudentAnswer
        fields = ('id', 'student', 'score', 'question',
                  'created_at', 'updated_at')

    def update(self, instance: StudentAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class MultipleChoiceQuestionAnswerSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField(read_only=True)
    correct = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Answer
        fields = ('id', 'question', 'content',
                  'correct',)

    def get_question(self, obj):
        return obj.question.id


# def update_result(instance):
#     result = instance.result
#     user = result.user
#     user_answers = result.user_answers.all()
#     total_score = sum(user_answer.score for user_answer in user_answers)
#     print(user_answers, [
#           user_answer.score for user_answer in user_answers], total_score)
#     # Update the total score in the Result model
#     result.score = total_score / result.quiz.questions_count * 100
#     result.save()


class MultipleChoiceStudentAnswerSerializer(TimestampedSerializer):
    student = StudentSerializer(read_only=True)
    question = QuestionSerializer(read_only=True)
    selected_answer = MultipleChoiceQuestionAnswerSerializer(read_only=True)

    class Meta:
        model = MultipleChoiceStudentAnswer
        fields = ('id', 'student', 'score', 'question', 'selected_answer',
                  'created_at', 'updated_at')

    def get_user(self, obj: StudentAnswer):
        if obj.result and obj.result.user:
            return StudentSerializer(obj.result.user).data
        return None

    def update(self, instance: StudentAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        update_result(instance)
        return instance


class MultipleChoiceStudentAnswerSerializer(TimestampedSerializer):
    student = StudentSerializer(read_only=True)
    question = QuestionSerializer(read_only=True)
    selected_answer = MultipleChoiceQuestionAnswerSerializer(read_only=True)

    class Meta:
        model = MultipleChoiceStudentAnswer
        fields = ('id', 'student', 'score', 'question', 'selected_answer',
                  'created_at', 'updated_at')

    def update(self, instance: StudentAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        update_result(instance)
        return instance


class TextAreaStudentAnswerSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    question = QuestionSerializer(read_only=True)
    selected_answer = MultipleChoiceQuestionAnswerSerializer(read_only=True)

    class Meta:
        model = MultipleChoiceStudentAnswer
        fields = ('id', 'student', 'score', 'question', 'selected_answer',
                  'created_at', 'updated_at')

    def update(self, instance: StudentAnswer, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        update_result(instance)
        return instance


class StudentAnswerPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        StudentAnswer: StudentAnswerSerializer,
        MultipleChoiceStudentAnswer: MultipleChoiceStudentAnswerSerializer,
        TextAreaStudentAnswer: TextAreaStudentAnswerSerializer,
    }
