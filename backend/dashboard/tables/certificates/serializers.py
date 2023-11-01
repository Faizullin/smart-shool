from rest_framework import serializers
from dashboard.models import Certificate
from dashboard.serializers import FileSerializer, StudentSerializer
from utils.serializers import TimestampedSerializer


class CertificateSerializer(TimestampedSerializer):
    image = FileSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Certificate
        fields = ('id', "student", "subject", "image",
                  "created_at",  'updated_at')
