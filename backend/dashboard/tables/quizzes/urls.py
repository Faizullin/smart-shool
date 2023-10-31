from django.urls import path, include
from rest_framework_nested.routers import SimpleRouter, NestedDefaultRouter
from .views import *

router = SimpleRouter()
router.register('', QuizViewSet)
domains_router = NestedDefaultRouter(router, r'', lookup='quizes')
domains_router.register(r'questions', QuestionViewSet, basename='quizes-questions')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(domains_router.urls)),
]
