from django.shortcuts import render
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views import View
from django.urls import reverse_lazy
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status, permissions, generics, filters


from accounts.permissions import IsStudent
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Article
from .forms import *
from .serializers import *


class ArticleListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


class ArticleFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    subject = django_filters.CharFilter(field_name='subject__title', lookup_expr='icontains')

    class Meta:
        model = Article
        fields = ['title', 'subject',]


class ArticleListView(ListAPIView):
    queryset = Article.published.all()
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    # filterset_class = ArticleFilter
    search_fields = ['id', 'title']
    ordering_fields = ['id', 'created_at', 'updated_at']
    ordering = ['-id']
    
    pagination_class = ArticleListPagination

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]


class ArticleRetrieveView(RetrieveAPIView):
    queryset = Article.published.all()
    serializer_class = ArticleSerializer

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]