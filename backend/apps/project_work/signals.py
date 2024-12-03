from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from .models import PracticalWork, FileModel


@receiver(pre_delete, sender=PracticalWork)
def post_delete_files(sender, instance: PracticalWork, *args, **kwargs):
    try:
        instance.files.all().delete()
    except Exception as err:
        pass


@receiver(pre_save, sender=PracticalWork)
def pre_save_files(sender, instance: PracticalWork, *args, **kwargs):
    try:
        prev_instance: PracticalWork = instance.__class__.objects.get(
            id=instance.id)
        old_files_ids = prev_instance.files.values_list('id', flat=True)
        try:
            new_files_ids = instance.files.values_list('id', flat=True)
        except:
            new_files_ids = []
        if len(new_files_ids) > 0 and len(old_files_ids) > 0:
            delete_files_ids = []
            for i in old_files_ids:
                if not i in new_files_ids:
                    delete_files_ids.append(i)
            FileModel.objects.filter(id__in=delete_files_ids).delete()
    except:
        pass
