from django.urls import path

from .views import *

app_name = 'accounts_face_recognition'

urlpatterns = [
    path('api/v1/face_id/train/', FaceIdTrainView.as_view(),
         name='face_id-train'),
    path('api/v1/face_id/login/', FaceIdLoginView.as_view(),
         name='face_id-login'),
]