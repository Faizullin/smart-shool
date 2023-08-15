
from django.urls import path
from .views import *

urlpatterns = [
    path('', assign_subject_groups, name='assign_subject_groups_list'),
    path('save', assign_subject_groups_save, name='assign_subject_groups_save'),
]