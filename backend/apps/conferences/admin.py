from django.contrib import admin

from utils.admin import BaseAdmin
from .models import VideoConference


@admin.register(VideoConference)
class ConferenceAdmin(BaseAdmin):
    pass
