from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'', SubmittedPracticalWorkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
