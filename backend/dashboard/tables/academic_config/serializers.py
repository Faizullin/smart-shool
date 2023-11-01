from rest_framework import serializers
from academics.models import AcademicConfig
from utils.serializers import TimestampedSerializer


class AcademicConfigSerializer(TimestampedSerializer):
    class Meta:
        model = AcademicConfig
        fields = ('id', 'assign_groups_theory_min',
                  'email_enabled', 'created_at', 'updated_at')

    def update(self, instance: AcademicConfig, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
