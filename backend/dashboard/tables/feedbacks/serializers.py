from rest_framework import serializers
from results.models import Feedback
from dashboard.tables.results.serializers import ResultSerializer
from utils.serializers import TimestampedSerializer


class FeedbackSerializer(TimestampedSerializer):
    result = ResultSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = ('id', 'result', 'watched', 'content',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'result',)
