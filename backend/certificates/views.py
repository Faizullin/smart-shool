from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import permissions, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import *
from accounts.permissions import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import Group
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.decorators import login_required

from accounts.permissions import *
from results.models import *
from .models import *
from .operations import generate_cert

# Create your views here.


class CertificateSubmitView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def post(self, request):
        student = request.student
        cert = generate_cert(student=student)
        return Response(data=CertificateSerializer(cert).data)


class CertificateListMyView(ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.student
        return Certificate.objects.filter(student=student)


class CertificateRetrieveView(RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
