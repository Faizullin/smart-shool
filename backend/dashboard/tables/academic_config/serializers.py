from rest_framework import serializers
from academics.models import AcademicConfig
from utils.serializers import TimestampedSerializer


class AcademicConfigSerializer(TimestampedSerializer):
    class Meta:
        model = AcademicConfig
        fields = ('id', 'assign_groups_theory_min','email_enabled', 'created_at', 'updated_at')
