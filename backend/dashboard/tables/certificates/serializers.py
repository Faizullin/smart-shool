from rest_framework import serializers
from dashboard.models import Certificate
from dashboard.tables.files.serializers import FileSerializer


class CertificateSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    image = FileSerializer(read_only=True)

    class Meta:
        model = Certificate
        fields = ('id', "student", "subject", "image",
                  "created_at",  'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')
