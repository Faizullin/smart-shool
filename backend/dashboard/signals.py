from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import *
from utils.send_email_message import SiteUrls, send_email_message


@receiver(post_save, sender=User)
def post_save_user(sender, instance, *args, **kwargs):
    user = instance
    send_email_message({
        'student': instance,
        'username': user.username,
        'user': user,
        'email': user.email,
        "app.content.email": 'email/notification/student_change.html',
        "app.content.txt": 'email/notification/student_change.txt',
    }, [user.email])