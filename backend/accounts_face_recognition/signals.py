from django.dispatch import receiver
from django.db.models.signals import post_delete
from .models import StudentTrainFaceImage


@receiver(post_delete, sender=StudentTrainFaceImage)
def post_save_image(sender, instance, *args, **kwargs):
    try:
        instance.train_face_image.delete(save=False)
    except:
        pass
