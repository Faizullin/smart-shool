
from django.urls import path
from .views import *

urlpatterns = [
    path('', {ModelName}ListView.as_view(), name='{verbal_url_name}_list'),
    path('create', {verbal_url_name}_create, name='{verbal_url_name}_create'),
    path('update/<int:pk>', {verbal_url_name}_edit, name='{verbal_url_name}_edit'),
    path('delete/<int:pk>', {verbal_url_name}_delete, name='{verbal_url_name}_delete'),
]