from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from utils.models import TimestampedModel
from academics.models import Subject
from files.models import File


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()\
            .filter(status='published')


class Article(TimestampedModel):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )
    title = models.CharField("Article Title", max_length=255)
    featured_image = models.OneToOneField(
        File, null=True, blank=True, on_delete=models.SET_NULL, related_name='featured_image_of_article')
    file = models.OneToOneField(
        File, null=True, blank=True, on_delete=models.SET_NULL)
    subject = models.ForeignKey(
        Subject, on_delete=models.DO_NOTHING, related_name='articles')
    content = RichTextUploadingField(config_name='default')
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='draft')
    published = PublishedManager()   # Custom published manager.
    objects = models.Manager()   # Default manager.

    class Meta:
        ordering = ['-created_at']
        get_latest_by = "created_at"

    @property
    def featured_image_url(self):
        if self.featured_image:
            return self.featured_image.url
        return ''

    @property
    def file_url(self):
        if self.file:
            return self.file.url
        return ''

    def __str__(self):
        return self.title
