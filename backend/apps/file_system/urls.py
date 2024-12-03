from django.urls import path
from .views import FileDetailView

app_name = 'file_system'

urlpatterns = [
    path('api/v1/files/<int:pk>/', FileDetailView.as_view()),
]
