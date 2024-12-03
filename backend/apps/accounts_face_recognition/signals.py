from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import StudentTrainFaceImage


@receiver(post_delete, sender=StudentTrainFaceImage)
def post_delete_files(sender, instance: StudentTrainFaceImage, *args, **kwargs):
    try:
        instance.image.delete()
    except:
        pass