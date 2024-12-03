from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from .models import Certificate
from utils.serializers import TimestampedSerializer
from apps.file_system.serializers import FileSerializer
from apps.academics.models import Subject


class CertificateSubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'created_at', 'updated_at']


class CertificateSerializer(TimestampedSerializer):
    image = FileSerializer(read_only=True)
    subject = CertificateSubjectSerializer(read_only=True)

    class Meta:
        model = Certificate
        fields = ['id', 'student', 'subject', 'image', 'updated_at']
