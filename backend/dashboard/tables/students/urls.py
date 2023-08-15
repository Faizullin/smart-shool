
from django.urls import path
from .views import *
from .autocomplete_view import *

urlpatterns = [
    path('', StudentListView.as_view(), name='student_list'),
    path('create', student_create, name='student_create'),
    path('update/<int:pk>', student_edit, name='student_edit'),
    path('delete/<int:pk>', student_delete, name='student_delete'),
    path('autocomplete/user/', user_autocomplete, name='user_autocomplete'),
]
