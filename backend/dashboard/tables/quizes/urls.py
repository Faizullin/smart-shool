
from django.urls import path
from .views import *

urlpatterns = [
    path('', QuizListView.as_view(), name='quiz_list'),
    path('create', quiz_create, name='quiz_create'),
    path('update/<int:pk>', quiz_edit, name='quiz_edit'),
    path('delete/<int:pk>', quiz_delete, name='quiz_delete'),
]