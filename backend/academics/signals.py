from django.dispatch import receiver
from django.db.models.signals import post_save
from academics.models import SubjectGroup


@receiver(post_save, sender=SubjectGroup)
def post_save_subject_group(sender, instance: SubjectGroup, created, **kwargs):
    if not instance.title:
        instance.title = f"Group {instance.pk}"
        instance.save()
