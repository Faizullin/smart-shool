from apps.results.models import Result, StudentAnswer, Choice
from apps.dashboard.serializers import StudentSerializer, StudentSerializer
from apps.dashboard.tables.quizzes.serializers import QuestionRetrieveSerializer
from utils.serializers import TimestampedSerializer
from apps.exams.operations import re_calculate_result


class ResultSerializer(TimestampedSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'checked', 'total_score', 'student')


class StudentAnswerSerializer(TimestampedSerializer):
    question = QuestionRetrieveSerializer(read_only=True)
    result = ResultSerializer(read_only=True)
    # answer_choices = QuestionAnswerSerializer(read_only=True, many=True)

    class Meta:
        model = StudentAnswer
        fields = ('id', 'result', 'score', 'question',
                  'answer_choices', 'answer_text', 'created_at', 'updated_at')

    def update(self, instance: Choice, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        re_calculate_result(instance.result, save=True)
        return instance
