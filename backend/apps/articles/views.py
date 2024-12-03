from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, PopularArticle
from .serializers import *


class ArticleListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ArticleListView(ListAPIView):
    serializer_class = ArticleListSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['title', 'subject']
    search_fields = ['id', 'title']
    ordering_fields = ['id', 'created_at', 'updated_at']
    pagination_class = ArticleListPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Article.objects.prefetch_related('subject').select_related('featured_image',).all()


class PopularArticleListView(ListAPIView):
    serializer_class = ArticleListSerializer
    authentication_classes = ()

    def get_queryset(self):
        popular_items_queryset_ids = PopularArticle.objects.filter(
            status='published').values_list('id', flat=True)
        return Article.objects.prefetch_related('subject').select_related('featured_image',).filter(popular_items__id__in=popular_items_queryset_ids)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ArticleRetrieveView(RetrieveAPIView):
    serializer_class = ArticleDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        return Article.objects.prefetch_related('files').select_related('featured_image', 'subject').all()


class ArticleFiltersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        import logging
        logger = logging.getLogger(__name__)
        logger.info("INFO")
        logger.debug("DEBUG")
        logger.error("Error")
        logger = logging.getLogger('accounts_face_recognition')
        logger.info("INFO")
        logger.debug("DEBUG")
        logger.error("Error")
        subjects_queryset = Subject.objects.annotate(
            articles_count=Count('articles'))
        return Response({
            'subjects': SubjectSerializer(subjects_queryset, many=True).data
        }, status=status.HTTP_200_OK)
