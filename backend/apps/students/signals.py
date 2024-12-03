from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Student
from ..accounts.groups import StudentGroup


@receiver(post_save, sender=Student)
def assign_group_to_user(sender, instance, created, **kwargs):
    if created:
        student_group = Group.objects.get(id=StudentGroup.id)
        instance.user.groups.add(student_group)


@receiver(pre_delete, sender=Student)
def remove_group_from_user(sender, instance, **kwargs):
    if hasattr(instance, 'user'):
        student_group = Group.objects.get(id=StudentGroup.id)
        instance.user.groups.remove(student_group)
