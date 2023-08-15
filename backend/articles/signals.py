from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Article


@receiver(post_delete, sender=Article)
def post_delete_files(sender, instance, *args, **kwargs):
    try:
        instance.featured_image.delete(save=False)
        instance.file.delete(save=False)
    except:
        pass