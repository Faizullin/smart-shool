
from django.urls import path
from .views import *

urlpatterns = [
    path('', PracticalListView.as_view(), name='practical_list'),
    path('create', practical_create, name='practical_create'),
    path('update/<int:pk>', practical_edit, name='practical_edit'),
    path('delete/<int:pk>', practical_delete, name='practical_delete'),
]