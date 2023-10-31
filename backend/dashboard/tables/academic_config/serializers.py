from rest_framework import serializers
from dashboard.models import AcademicConfig


class AcademicConfigSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AcademicConfig
        fields = ('id', 'email_enabled', 'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')
