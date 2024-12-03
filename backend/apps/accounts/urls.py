from django.urls import include, path, re_path
from rest_framework_simplejwt import views as jwt_views

from .views import *

app_name = 'accounts'

urlpatterns = [
    path('api/v1/register/', RegisterView.as_view(), name='register'),
    path('api/v1/login/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    re_path(r'^api/v1/password_reset/',
            include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/v1/user/', AuthProfileView.as_view(), name='user'),
    path('api/v1/password_change/', ChangePasswordView.as_view(),
         name='password_change'),
    path('api/v1/profile_update/', UpdateProfileView.as_view(), name='profile_update'),
]