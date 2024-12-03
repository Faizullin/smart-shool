from django.urls import re_path

from .consumers import VideoConferenceUserConsumer

websocket_urlpatterns = [
    re_path(r"ws/conference/(?P<room_name>\w+)/$", VideoConferenceUserConsumer.as_asgi()),
]
