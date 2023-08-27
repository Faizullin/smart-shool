from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings
from django.urls import reverse
from academics.models import Subject


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()\
            .filter(status='published')


def article_featured_image_directory_path(instance, filename):
    return 'articles/featured_images/article_{0}/{1}'.format(instance.pk, filename)


def article_file_directory_path(instance, filename):
    return 'articles/files/article_{0}/{1}'.format(instance.pk, filename)


class Article(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )
    title = models.CharField("Article Title", max_length=255)
    featured_image = models.ImageField(
        upload_to=article_featured_image_directory_path, null=True, blank=True)
    subject = models.ForeignKey(
        Subject,
        on_delete=models.DO_NOTHING,
        related_name='articles'
    )
    content = RichTextUploadingField(config_name='default')
    force_highlighted = models.BooleanField(default=False)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )
    file = models.FileField(
        "Pdf file", upload_to=article_file_directory_path, null=True, blank=True)

    published = PublishedManager()   # Custom published manager.
    objects = models.Manager()   # Default manager.

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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

    def get_absolute_url(self):
        return reverse('articles:detail', kwargs={'id': self.id})

    # def short_description(self):
    #     choices = [10, 15, 18]
    #     html = markdown(self.content)
    #     text = ''.join(BeautifulSoup(html).findAll(text=True))
    #     text = text.replace('\xa0', ' ').replace('\n', ' ').split(' ')
    #     return ' '.join(text[:choice(choices)])
