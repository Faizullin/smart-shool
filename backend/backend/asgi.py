"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from .middlewares import WebSocketJWTAuthMiddleware
from .routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.conf import settings

django_asgi_app = get_asgi_application()

if settings.USE_WS:
    application = ProtocolTypeRouter({
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(
            WebSocketJWTAuthMiddleware(
                URLRouter(
                    websocket_urlpatterns
                )
            )
        ),
    })
else:
    application = django_asgi_app