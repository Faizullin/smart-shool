from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from dashboard.models import File as FileModel


class FileSerializer(TimestampedSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FileModel
        fields = ('id', 'name', 'extension', 'size', 'url', 'file',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'name', 'extension', 'size')

    def create(self, validated_data):
        file = FileModel.objects.create(**validated_data)
        return file

    def update(self, instance: FileModel, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def get_url(self, obj: FileModel):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if obj.file else ""
