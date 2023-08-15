from django.contrib import admin
from django.urls import path
from .views import *

app_name = 'accounts_face_recognition'

urlpatterns = [
    path('api/face_id/train/', FaceIdRetrainView.as_view(),
         name='face_id-train'),
    path('api/face_id/login/', FaceIdLoginView.as_view(),
         name='face_id-login'),
    path('api/face_id/verify/', FaceIdVerifyView.as_view(),
         name='face_id-verify'),
]
