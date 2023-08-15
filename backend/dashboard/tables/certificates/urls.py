
from django.urls import path
from .views import *

urlpatterns = [
    path('', CertificateListView.as_view(), name='certificate_list'),
    path('create', certificate_create, name='certificate_create'),
    path('update/<int:pk>', certificate_edit, name='certificate_edit'),
    path('delete/<int:pk>', certificate_delete, name='certificate_delete'),
]