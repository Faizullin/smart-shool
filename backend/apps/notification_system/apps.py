from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class NotificationsSystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.notification_system'
    verbose_name = _("Notifications")
    
    def ready(self):
        import apps.notification_system.signals
