
from django.urls import path
from .views import *

urlpatterns = [
    path('', SubjectGroupListView.as_view(), name='subjectgroup_list'),
    path('create', subjectgroup_create, name='subjectgroup_create'),
    path('update/<int:pk>', subjectgroup_edit, name='subjectgroup_edit'),
    path('delete/<int:pk>', subjectgroup_delete, name='subjectgroup_delete'),
]