from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from apps.dashboard.tables.files.serializers import DashboardFileSerializer
from apps.articles.models import Article, PopularArticle
from apps.academics.models import Subject
from apps.file_system.models import File as FileModel


class DashboardArticleSubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')



class DashboardArticleSerializer(TimestampedSerializer):
    subject = DashboardArticleSubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
    )
    files = DashboardFileSerializer(read_only=True, many=True)
    featured_image = DashboardFileSerializer(read_only=True)
    featured_image_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=FileModel.objects.all())

    class Meta:
        model = Article
        fields = ('id', 'title', 'files', 'featured_image', 'featured_image_id',
                  'subject', 'subject_id', 'created_at', 'updated_at', 'quiz')

    def create(self, validated_data):
        subject = validated_data.pop('subject_id', None)
        article = Article.objects.create(
            **validated_data, subject_id=subject.pk)
        return article

    def update(self, instance: Article, validated_data):
        subject = validated_data.pop('subject_id', None)
        featured_image = validated_data.pop('featured_image_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if featured_image:
            instance.featured_image_id = featured_image.pk
        if subject:
            instance.subject_id = subject.pk
        instance.save()
        return instance


class DashboardArticleDocumentContentSerializer(TimestampedSerializer):
    class Meta:
        model = Article
        fields = ('id', 'content', 'created_at', 'updated_at')


class DashboardArticleDocumentFileSerializer(serializers.ModelSerializer):
    type = serializers.CharField(write_only=True)
    file = serializers.FileField()

    class Meta:
        model = FileModel
        fields = ('id', 'type', 'file', )

    def validate(self, attrs):
        type = attrs.get('type')
        file = attrs.get('file')
        file_types_data = {
            'attach': {
                'max_size': 20,  # MB limit
                'allowed_types': ["*"]
            },
            'featured_image': {
                'max_size': 10,  # MB limit
                'allowed_types': ['image/']
            }
        }

        if not type in ['attach', 'featured_image']:
            raise serializers.ValidationError("Invalid type.")

        file_types_data_item = file_types_data[type]
        if file.size > file_types_data_item['max_size'] * 1024 * 1024:
            raise serializers.ValidationError(
                F"File size exceeds {file_types_data_item['max_size']} MB.")
        if not '*' in file_types_data_item['allowed_types']:
            error = True
            for i in file_types_data_item['allowed_types']:
                if file.content_type.startswith(i):
                    error = False
                    break
            if error:
                raise serializers.ValidationError(
                    f"Invalid file type for {type}: { file.content_type}.")
        return attrs


class PopularDashboardArticleSerializer(TimestampedSerializer):
    articles_ids = serializers.PrimaryKeyRelatedField(
        queryset=Article.objects.all(), write_only=True, many=True, required=False
    )

    def create(self, validated_data):
        articles = validated_data.pop('articles_ids', [])
        instance = PopularArticle.objects.create(**validated_data)
        instance.items.set(articles)
        return instance

    def update(self, instance: PopularArticle, validated_data):
        articles = validated_data.pop('articles_ids', [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.items.set(articles)
        instance.save()
        return instance
