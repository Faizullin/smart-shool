from collections.abc import Iterable
from django.db import models
from utils.models import TimestampedModel
from django.core.files.storage import default_storage
import os

# Create your models here.


def file_directory_path(instance, filename):
    return 'files/{0}/{1}'.format(instance.pk, filename)


class File(TimestampedModel):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to=file_directory_path)
    extension = models.CharField(max_length=10)
    size = models.CharField(max_length=20)

    def save(self, *args, **kwargs) -> None:
        if not self.id:
            self.name = self.file.name
            self.extension = os.path.splitext(self.name)[1]
            self.size = self.file.size
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
