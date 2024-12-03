from rest_framework import serializers

from .models import AbstractTimestampedModel


def get_datetime_formatted(value) -> str:
    return value.strftime('%Y-%m-%d %H:%M:%S')


class TimestampedSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = AbstractTimestampedModel
        fields = ['created_at', 'updated_at']
        abstract = True
