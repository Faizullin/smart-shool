
from django.urls import path
from .views import *

urlpatterns = [
    path('', StudentListView.as_view(), name='my_student_list'),
    path('create', student_create, name='my_student_create'),
    path('update/<int:pk>', student_edit, name='my_student_edit'),
    path('delete/<int:pk>', student_delete, name='my_student_delete'),
]