from rest_framework import serializers
from dashboard.models import {ModelName}


class {ModelName}Serializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = {ModelName}
        fields = ('id', 'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')
