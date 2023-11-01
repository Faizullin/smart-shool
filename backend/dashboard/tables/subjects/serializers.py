from rest_framework import serializers
from academics.models import Subject
from utils.serializers import TimestampedSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')
    # def create(self, validated_data):
    #     quiz = Subject.objects.create(**validated_data,)
    #     return quiz

    # def update(self, instance: Subject, validated_data):
    #     for key, value in validated_data.items():
    #         setattr(instance, key, value)
    #     instance.save()
    #     return instance
