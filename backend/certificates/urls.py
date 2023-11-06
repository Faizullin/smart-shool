from django.urls import path
from .views import *

app_name = 'certificates'

urlpatterns = [
    path('api/certificates/my/', CertificateListMyView.as_view(),
         name='certificate-list-my'),
    path('api/certificates/<int:pk>/',
         CertificateRetrieveView.as_view(), name='certificates-retirve'),
]
