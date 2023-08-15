from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.db.models.signals import post_save

from .models import User
from django_rest_passwordreset.signals import reset_password_token_created
from utils.send_email_message import SiteUrls, send_email_message
from academics.models import get_current_academic_config


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    if not get_current_academic_config().email_enabled:
        return
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(SiteUrls.RESET_PASSWORD_CONFIRM_URL, reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string(
        'email/user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title=SiteUrls.SITE_COMMAND),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


@receiver(post_save, sender=User)
def post_init_user(sender, instance, created, **kwargs):
    if created:
        user = instance
        send_email_message({
            'username': user.username,
            'user': user,
            'email': user.email,
            "app.content.email": 'email/notification/user_init.html',
            "app.content.txt": 'email/notification/user_init.txt',
        }, [user.email])
