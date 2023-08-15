
from django.urls import path
from .views import *

urlpatterns = [
    path('', QuestionListView.as_view(), name='question_list'),
    path('create', question_create, name='question_create'),
    path('update/<int:pk>', question_edit, name='question_edit'),
    path('delete/<int:pk>', question_delete, name='question_delete'),
]