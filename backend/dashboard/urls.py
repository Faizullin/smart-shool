import json
from django.urls import path, include
from django.contrib.auth.views import LogoutView
from .views import *

app_name = 'dashboard'


urlpatterns = [
    path('dashboard/', dashboard_index, name='index'),
    path('dashboard/profile/', dashboard_profile, name='profile'),
    path('dashboard/storage/', dashboard_storage, name='storage'),
    path('dashboard/storage/delete/', storage_delete, name='storage_delete'),
    path('dashboard/auth/login/', dashboard_login, name="auth_login"),
    path("dashboard/auth/logout/", LogoutView.as_view(), name="auth_logout"),
]

with open('dashboard/json/urls.json', 'r') as f:
    data = json.loads(f.read())
    for value in data:
        urlpatterns.append(path((value['url']), include(value['file'])))
