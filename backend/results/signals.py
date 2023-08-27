from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Result


@receiver(post_delete, sender=Result)
def post_delete_files(sender, instance, *args, **kwargs):
    try:
        instance.record.delete(save=False)
    except:
        pass