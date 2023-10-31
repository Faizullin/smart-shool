from django.urls import path, include, re_path
from .views import *
from rest_framework_simplejwt import views as jwt_views

app_name = 'accounts'

urlpatterns = [
      path('api/register/', RegisterView.as_view(), name='register'),
      path('api/login/', 
            jwt_views.TokenObtainPairView.as_view(), 
            name ='token_obtain_pair'),
      path('api/token/refresh/', 
            jwt_views.TokenRefreshView.as_view(), 
            name ='token_refresh'),
      re_path(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
      path('api/user/', AuthProfileView.as_view(), name='user'),
      path('api/password_change/', ChangePasswordView.as_view(), name='password_change'),
      path('api/profile_update/', UpdateProfileView.as_view(), name='profile_update'),
]