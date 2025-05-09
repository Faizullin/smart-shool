from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import File


@receiver(pre_delete, sender=File)
def pre_delete_files(sender, instance: File, *args, **kwargs):
    try:
        instance.file.delete(save=False)
    except:
        pass
