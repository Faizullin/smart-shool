from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import Certificate


@receiver(post_delete, sender=Certificate)
def post_save_image(sender, instance: Certificate, *args, **kwargs):
    try:
        instance.image.delete()
    except:
        pass


@receiver(pre_save, sender=Certificate)
def pre_save_image(sender, instance: Certificate, *args, **kwargs):
    try:
        prev_instance: Certificate = instance.__class__.objects.get(
            id=instance.id)
        old_file = prev_instance.image
        try:
            new_file = instance.image
        except:
            new_file = None
        if new_file and old_file and new_file.pk != old_file.pk:
            old_file.delete()
    except:
        pass
