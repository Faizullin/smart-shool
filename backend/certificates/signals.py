from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Certificate


@receiver(post_delete, sender=Certificate)
def post_save_image(sender, instance, *args, **kwargs):
    try:
        instance.image.delete(save=False)
    except:
        pass