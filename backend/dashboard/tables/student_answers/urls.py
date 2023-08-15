
from django.urls import path
from .views import *

urlpatterns = [
    path('', StudentAnswerListView.as_view(), name='studentanswer_list'),
    path('create', studentanswer_create, name='studentanswer_create'),
    path('update/<int:pk>', studentanswer_edit, name='studentanswer_edit'),
    path('delete/<int:pk>', studentanswer_delete, name='studentanswer_delete'),
]