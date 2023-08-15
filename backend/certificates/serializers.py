from rest_framework import serializers
from .models import *
from PIL import Image


class CertificateSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'student', 'subject', 'image', 'updated_at']

    updated_at = serializers.SerializerMethodField(read_only=True)

    def get_updated_at(self, obj):
        return obj.get_updated_at.strftime('%d %B %Y')


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'student', 'subject', 'image', 'updated_at']

    updated_at = serializers.SerializerMethodField(read_only=True)

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')