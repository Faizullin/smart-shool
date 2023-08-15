
from django.urls import path
from .views import *

urlpatterns = [
    #path('', StudentListView.as_view(), name='student_list'),
    path('', assign_subject_groups, name='assign_subject_groups_list'),
    path('save', assign_subject_groups_save, name='assign_subject_groups_save'),
    path('update/<int:pk>', student_edit, name='assign_subject_groups_edit'),
    path('delete/<int:pk>', student_delete, name='assign_subject_groups_delete'),
]