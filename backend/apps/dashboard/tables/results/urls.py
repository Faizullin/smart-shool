from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'', ResultViewSet)

urlpatterns = [
    path('stats/', ResultStats.as_view()),
    path('', include(router.urls)),
]
