from rest_framework import serializers
from dashboard.models import Result
from dashboard.tables.quizes.serializers import QuizSerializer
from dashboard.tables.users.serializers import UserSerializer


class ResultSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    quiz = QuizSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'user', 'quiz', 'score',
                  'checked', 'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')
