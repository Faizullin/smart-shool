from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken, TokenError

User = get_user_model()


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class WebSocketJWTAuthMiddleware:

    KEYS_TO_RETRIEVE = ["device__id", "device__password"]

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        parsed_query_dict = parse_qs(scope["query_string"].decode())
        parsed_query_string_token = parsed_query_dict.get("token")
        if not parsed_query_string_token:
            scope["user"] = AnonymousUser()
        else:
            token = parsed_query_string_token[0]
            try:
                access_token = AccessToken(token)
                scope["user"] = await get_user(access_token["user_id"])
            except TokenError:
                scope["user"] = AnonymousUser()
        scope["args"] = parsed_query_dict

        return await self.app(scope, receive, send)
