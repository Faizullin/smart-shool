from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from dashboard.tables.files.serializers import FileSerializer
from articles.models import Article
from academics.models import Subject
from files.models import File


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')


class ArticleSerializer(TimestampedSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )
    file_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=File.objects.all())
    file = FileSerializer(read_only=True)
    featured_image_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=File.objects.all())
    featured_image = FileSerializer(read_only=True)
    files = FileSerializer(many=True, required=False)

    class Meta:
        model = Article
        fields = ('id', 'title', 'file', 'file_id', 'featured_image', 'featured_image_id',
                  'files', 'subject', 'subject_id', 'content',  'created_at', 'updated_at')

    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        article = Article.objects.create(
            **validated_data, subject_id=subject.pk)
        return article

    def update(self, instance: Article, validated_data):
        subject = validated_data.pop('subject_id', None)
        featured_image = validated_data.pop('featured_image_id', None)
        file = validated_data.pop('file_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if featured_image:
            instance.featured_image_id = featured_image.pk
        if subject:
            instance.subject_id = subject.pk
        if file:
            instance.file_id = file.pk
        instance.save()
        return instance
