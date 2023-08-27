from django.shortcuts import redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views import View
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status, permissions, generics, filters
from rest_framework.response import Response
from django.db.models import Count

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


class ArticleListView(ListAPIView):
    queryset = Article.published.all()
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['title', 'subject']
    search_fields = ['id', 'title']
    ordering_fields = ['id', 'created_at', 'updated_at']
    pagination_class = ArticleListPagination

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]


class ArticleRetrieveView(RetrieveAPIView):
    queryset = Article.published.all()
    serializer_class = ArticleSerializer

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class ArticleFiltersView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get(self, request):
        subjects_queryset = Subject.objects.annotate(
            articles_count=Count('articles'))
        return Response({
            'subjects': SubjectFiltersSerializer(subjects_queryset, many=True).data
        }, status=status.HTTP_200_OK)
