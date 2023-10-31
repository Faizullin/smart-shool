from rest_framework import serializers
from .models import Tag, FileContent


class TagSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tag
        fields = ('id', 'title', 'slug', 'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')


class FileContentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FileContent
        fields = ('id', 'url',)

    def get_url(self, obj: FileContent):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if obj.file else ""
