
from django.urls import path
from .views import *

urlpatterns = [
    path('', ResultListView.as_view(), name='result_list'),
    path('create', result_create, name='result_create'),
    path('update/<int:pk>', result_edit, name='result_edit'),
    path('delete/<int:pk>', result_delete, name='result_delete'),
    path('stats/<int:pk>', result_stats, name='result_stats'),
]