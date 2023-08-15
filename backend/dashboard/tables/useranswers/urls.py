
from django.urls import path
from .views import *

urlpatterns = [
    path('', UserAnswerListView.as_view(), name='useranswer_list'),
    path('create', useranswer_create, name='useranswer_create'),
    path('update/<int:pk>', useranswer_edit, name='useranswer_edit'),
    path('delete/<int:pk>', useranswer_delete, name='useranswer_delete'),
]