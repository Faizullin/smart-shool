from django.apps import AppConfig


class ProjectWorkConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.project_work'

    
    def ready(self) -> None:
        import apps.project_work.signals