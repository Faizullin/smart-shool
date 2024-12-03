from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

from utils.send_email_message import SiteUrls, send_email_message


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
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(SiteUrls.RESET_PASSWORD_CONFIRM_URL, reset_password_token.key),
        'app.content.email': 'email/user_reset_password.html',
        'app.content.txt': 'email/user_reset_password.txt',
        'app.title': "Password Reset for {title}".format(title=SiteUrls.SITE_COMMAND),
        'app.from_email': "noreply@somehost.local",
    }
    send_email_message(context, [reset_password_token.user.email])