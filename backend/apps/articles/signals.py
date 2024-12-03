from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver

from .models import Article


@receiver(pre_delete, sender=Article)
def pre_delete_files(sender, instance: Article, *args, **kwargs):
    try:
        instance.featured_image.delete()
        instance.files.delete()
    except:
        pass


@receiver(pre_save, sender=Article)
def pre_save_files(sender, instance: Article, *args, **kwargs):
    try:
        prev_instance: Article = instance.__class__.objects.get(
            id=instance.id)
        # old_file = prev_instance.file
        # try:
        #     new_file = instance.file
        # except:
        #     new_file = None
        # if new_file and old_file and new_file.pk != old_file.pk:
        #     old_file.delete()
        old_file = prev_instance.featured_image
        try:
            new_file = instance.featured_image
        except:
            new_file = None
        if new_file and old_file and new_file.pk != old_file.pk:
            old_file.delete()
    except:
        pass
