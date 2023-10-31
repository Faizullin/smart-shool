from django.urls import path, include
from django.contrib.auth.views import LogoutView
import json
# from .views import *

app_name = 'dashboard'


urlpatterns = [
    # path('api/s/storage/', dashboard_storage, name='storage'),
    # path('api/s/storage/delete/', storage_delete, name='storage_delete'),
    path("api/s/auth/logout/", LogoutView.as_view(), name="auth_logout"),
]

with open('dashboard/json/urls.json', 'r') as f:
    data = json.loads(f.read())
    for value in data:
        urlpatterns.append(path((value['url']), include(value['file'])))
