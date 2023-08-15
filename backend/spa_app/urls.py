from django.urls import path, include
from .views import *

app_name = 'spa_app'


urlpatterns = [
    path('', index, name='index'),
]
