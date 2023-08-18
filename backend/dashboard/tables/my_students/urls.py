
from django.urls import path
from .views import *

urlpatterns = [
    path('', StudentListView.as_view(), name='my_student_list'),
]