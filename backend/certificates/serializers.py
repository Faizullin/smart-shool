from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from .models import *


class CertificateSerializer(TimestampedSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'student', 'subject', 'image', 'updated_at']
