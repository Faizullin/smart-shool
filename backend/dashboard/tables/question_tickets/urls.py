
from django.urls import path
from .views import *

urlpatterns = [
    path('', QuestionTicketListView.as_view(), name='questionticket_list'),
    path('create', questionticket_create, name='questionticket_create'),
    path('update/<int:pk>', questionticket_edit, name='questionticket_edit'),
    path('delete/<int:pk>', questionticket_delete, name='questionticket_delete'),
]