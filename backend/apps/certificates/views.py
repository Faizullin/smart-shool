
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions

from apps.accounts.permissions import *
from .models import Certificate
from .serializers import CertificateSerializer

# Create your views here.


class CertificateListMyView(ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.user.student
        return Certificate.objects.select_related('subject', 'image').filter(student=student).order_by('-id')


class CertificateRetrieveView(RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        student = self.request.user.student
        return Certificate.objects.select_related('subject', 'image').filter(student=student).order_by('-id')
