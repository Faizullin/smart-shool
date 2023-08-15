
from django.urls import path
from .views import *

urlpatterns = [
    path('', AcademicConfigListView.as_view(), name='academicconfig_list'),
    path('create', academicconfig_create, name='academicconfig_create'),
    path('update/<int:pk>', academicconfig_edit, name='academicconfig_edit'),
    path('delete/<int:pk>', academicconfig_delete, name='academicconfig_delete'),
]