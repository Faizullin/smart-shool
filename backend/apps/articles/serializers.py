from rest_framework import serializers

from apps.file_system.serializers import FileSerializer
from utils.serializers import TimestampedSerializer

from .models import Article, Subject


class SubjectSerializer(TimestampedSerializer):
    articles_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'title', 'articles_count',]


class ArticleListSerializer(TimestampedSerializer):
    subject = SubjectSerializer(read_only=True)
    featured_image = FileSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'featured_image',
                  'subject', 'status', 'created_at', 'updated_at']


class ArticleDetailSerializer(TimestampedSerializer):
    subject = SubjectSerializer(read_only=True)
    featured_image = FileSerializer(read_only=True)
    files = FileSerializer(read_only=True, many=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'featured_image', 'subject', 'content',
                  'files', 'status', 'created_at', 'updated_at']
