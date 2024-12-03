from django.db import models

from apps.academics.models import Subject
from apps.exams.models import Quiz
from apps.file_system.models import File as FileModel
from utils.models import AbstractTimestampedModel


class Article(AbstractTimestampedModel):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )
    title = models.CharField("Article Title", max_length=255)
    featured_image = models.OneToOneField(
        FileModel, null=True, blank=True, on_delete=models.SET_NULL, related_name='featured_image_of_article')
    files = models.ManyToManyField(FileModel)
    subject = models.ForeignKey(
        Subject, on_delete=models.DO_NOTHING, related_name='articles')
    # content = RichTextUploadingField(config_name='default')
    content = models.TextField()
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='draft')
    quiz = models.ForeignKey(Quiz, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['-created_at']
        get_latest_by = "created_at"

    def __str__(self):
        return self.title


class PopularArticle(AbstractTimestampedModel):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='draft')

    class Meta:
        ordering = ['-created_at']
        get_latest_by = "created_at"

    items = models.ManyToManyField(Article, related_name='popular_items')
