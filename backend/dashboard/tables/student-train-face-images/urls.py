from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'', StudentTrainFaceImageViewSet)

urlpatterns = [
    path('retrain/', FaceIdRetrainView.as_view()),
    path('', include(router.urls)),
]