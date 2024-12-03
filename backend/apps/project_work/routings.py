from django.urls import path, re_path
from .consumers import ProjectWorkDeviceDataConsumer, ProjectWorkUserDataConsumer

websocket_urlpatterns = [
    re_path(r"ws/projects/broadcast/(?P<room_name>\w+)/user/$", ProjectWorkUserDataConsumer.as_asgi()),
    re_path(r"ws/projects/broadcast/(?P<room_name>\w+)/device/$", ProjectWorkDeviceDataConsumer.as_asgi()),
]
