from rest_framework import serializers
from academics.models import *
from .models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'created_at', 'updated_at']
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')
    
class ArticleSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only = True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'featured_image', 'subject', 'content', 'force_highlighted', 'file',
                  'status', 'published', 'created_at', 'updated_at']
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')