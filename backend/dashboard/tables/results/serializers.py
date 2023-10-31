from rest_framework import serializers
from results.models import Result
from dashboard.tables.quizzes.serializers import QuizSerializer
from dashboard.tables.users.serializers import UserSerializer
from utils.serializers import TimestampedSerializer


class ResultSerializer(TimestampedSerializer):
    quiz = QuizSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'user', 'quiz', 'theoretical_score','practical_score','total_score',
                  'checked', 'created_at', 'updated_at')
