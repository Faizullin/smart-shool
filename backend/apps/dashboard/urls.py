from django.urls import path, include
from .views import DiskSpaceView
import json

app_name = 'dashboard'

urlpatterns = [
    path("api/s/disk_stats/", DiskSpaceView.as_view(), name="disk_stats"),
]

with open('apps/dashboard/json/urls.json', 'r') as f:
    data = json.loads(f.read())
    for value in data:
        urlpatterns.append(path((value['url']), include(value['file'])))
