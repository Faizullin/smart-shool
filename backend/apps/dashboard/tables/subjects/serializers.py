from rest_framework import serializers
from apps.academics.models import Subject
from utils.serializers import TimestampedSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')
