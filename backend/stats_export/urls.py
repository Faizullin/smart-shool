from django.urls import path, include, re_path
from .views import DownloadFileView

urlpatterns = [
    path("api/export/<str:model>/<str:format_type>/", DownloadFileView.as_view(), name="export-data"),
]
