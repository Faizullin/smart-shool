
from django.urls import path
from .views import *

urlpatterns = [
    path('', TeacherListView.as_view(), name='teacher_list'),
    path('create', teacher_create, name='teacher_create'),
    path('update/<int:pk>', teacher_edit, name='teacher_edit'),
    path('delete/<int:pk>', teacher_delete, name='teacher_delete'),
]