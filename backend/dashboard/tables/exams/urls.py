
from django.urls import path
from .views import *

urlpatterns = [
    path('', ExamListView.as_view(), name='exam_list'),
    path('create', exam_create, name='exam_create'),
    path('update/<int:pk>', exam_edit, name='exam_edit'),
    path('delete/<int:pk>', exam_delete, name='exam_delete'),
    path('stats/<int:pk>', exam_stats, name='exam_stats'),
]