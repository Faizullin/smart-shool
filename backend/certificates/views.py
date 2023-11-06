from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.permissions import *
from .models import Certificate
from .serializers import CertificateSerializer

# Create your views here.


class CertificateListMyView(ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.student
        return Certificate.objects.filter(student=student)


class CertificateRetrieveView(RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
