
from django.urls import path
from .views import *

urlpatterns = [
    path('', UserListView.as_view(), name='user_list'),
    path('create', user_create, name='user_create'),
    path('update/<int:pk>', user_edit, name='user_edit'),
    path('delete/<int:pk>', user_delete, name='user_delete'),
]