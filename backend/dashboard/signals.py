from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.conf import settings
from django.db.models.signals import pre_save, post_save
from .models import *
from utils.send_email_message import SiteUrls, send_email_message

from django.conf import settings


@receiver(post_save, sender=Student)
def post_save_student(sender, instance, *args, **kwargs):
    if settings.EMAIL_ENABLED:
        user = instance.user
        send_email_message({
            'student': instance,
            'username': user.username,
            'user': user,
            'email': user.email,
            "app.content.email": 'email/notification/student_change.html',
            "app.content.txt": 'email/notification/student_change.txt',
        }, [user.email])
