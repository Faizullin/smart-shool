from django.apps import AppConfig


class AccountsFaceRecognitionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.accounts_face_recognition'

    def ready(self) -> None:
        import apps.accounts_face_recognition.signals