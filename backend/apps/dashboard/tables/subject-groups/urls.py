from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'', SubjectGroupViewSet)

urlpatterns = [
    path('assign/', SubjectGroupAssignView.as_view()),
    path('', include(router.urls)),
]
