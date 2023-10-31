from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.conf import settings
from django.db.models.signals import post_init, post_save
from academics.models import get_current_academic_config


class SiteUrls:
    RESET_PASSWORD_CONFIRM_URL = settings.DOMAIN_URL + "/auth/password_reset/confirm"
    PROFILE_URL = settings.DOMAIN_URL + "/dashboard/profile"
    DASHBOARD_URL = settings.DOMAIN_URL + "/dashboard/"
    SITE_COMMAND = settings.DOMAIN_NAME
    SITE_URL = settings.DOMAIN_URL


def send_email_message(context: dict, user_emails: list):
    email_enabled = get_current_academic_config().email_enabled
    print("Email: context =", context, email_enabled)
    if not email_enabled:
        return
    try:
        context.update({
            'profile_url': SiteUrls.PROFILE_URL,
            'dashboard_url': SiteUrls.DASHBOARD_URL,
            'domain_name': SiteUrls.SITE_COMMAND,
        })
        email_html_message = render_to_string(
            context['app.content.email'], context)
        email_plaintext_message = render_to_string(
            context['app.content.txt'], context)

        msg = EmailMultiAlternatives(
            # title:
            context["app.title"] if "app.title" in context else "Notification from {title}".format(
                title=SiteUrls.SITE_COMMAND),
            # message:
            email_plaintext_message,
            # from:
            settings.EMAIL_SEND_FROM_NAME,
            # to:
            user_emails
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
    except Exception as err:
        print("Email error: ", err)