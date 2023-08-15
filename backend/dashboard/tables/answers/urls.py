
from django.urls import path
from .views import *

urlpatterns = [
    path('', AnswerListView.as_view(), name='answer_list'),
    path('create', answer_create, name='answer_create'),
    path('update/<int:pk>', answer_edit, name='answer_edit'),
    path('delete/<int:pk>', answer_delete, name='answer_delete'),
]