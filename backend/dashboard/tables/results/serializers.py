from rest_framework import serializers
from results.models import Result
from dashboard.tables.quizzes.serializers import QuizSerializer
from dashboard.serializers import StudentSerializer
from utils.serializers import TimestampedSerializer


class ResultSerializer(TimestampedSerializer):
    quiz = QuizSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'student', 'quiz', 'theoretical_score','practical_score','total_score',
                  'checked', 'created_at', 'updated_at')
