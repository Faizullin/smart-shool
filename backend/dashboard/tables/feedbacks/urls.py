
from django.urls import path
from .views import *

urlpatterns = [
    path('', FeedbackListView.as_view(), name='feedback_list'),
    path('create', feedback_create, name='feedback_create'),
    path('update/<int:pk>', feedback_edit, name='feedback_edit'),
    path('delete/<int:pk>', feedback_delete, name='feedback_delete'),
]