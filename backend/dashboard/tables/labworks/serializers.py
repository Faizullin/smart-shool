from rest_framework import serializers
from dashboard.models import Labwork, FileContent, Tag
from utils.serializers import TimestampedSerializer
from dashboard.serializers import FileContentSerializer, TagSerializer


class LabworkSerializer(TimestampedSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
    )
    files = FileContentSerializer(many=True, required=False)
    file_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, required=False, queryset=FileContent.objects.all())

    class Meta:
        model = Labwork
        fields = ('id', 'title', 'tags', 'tag_ids', 'files',
                  'file_ids', 'target_audience', 'created_at', 'updated_at')

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        labwork = Labwork.objects.create(**validated_data)
        labwork.tags.set(tag_ids)
        return labwork

    def update(self, instance: Labwork, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        file_ids = validated_data.pop('file_ids', [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        instance.tags.set(tag_ids)
        instance.files.set(file_ids)
        return instance
