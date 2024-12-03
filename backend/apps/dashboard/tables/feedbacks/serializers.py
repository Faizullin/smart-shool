from rest_framework import serializers
from apps.results.models import Feedback, Result
from apps.dashboard.tables.results.serializers import ResultSerializer
from utils.serializers import TimestampedSerializer


class FeedbackSerializer(TimestampedSerializer):
    result_id = serializers.PrimaryKeyRelatedField(
        queryset=Result.objects.all(),
        write_only=True
    )
    result = ResultSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = ('id', 'result', 'result_id', 'content',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'result',)

    def create(self, validated_data):
        result = validated_data.pop('result_id', None)
        article = Feedback.objects.create(
            **validated_data,)
        if result:
            article.result = result
            article.save()
        return article

    def update(self, instance: Feedback, validated_data):
        result = validated_data.pop('result_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if result:
            instance.result = result
        instance.save()
        return instance
