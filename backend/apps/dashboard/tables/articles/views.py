from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions, status
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from apps.accounts.permissions import IsTeacherOrAdmin
from apps.articles.models import Article, PopularArticle
from apps.file_system.models import File as FileModel
from .filters import ArticlePagination, ORDERING_FIELDS, ArticleFilter, SEARCH_FILTERSET_FIELDS
from .serializers import DashboardArticleSerializer, PopularDashboardArticleSerializer, \
    DashboardArticleDocumentContentSerializer, DashboardArticleDocumentFileSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = DashboardArticleSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ArticleFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = ArticlePagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        return Article.objects.prefetch_related('files', ).select_related('subject', 'featured_image').all()


class ArticleDocumentContentViewSet(RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = DashboardArticleDocumentContentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        return Article.objects.only('content')


class ArticleDocumentFileViewSet(viewsets.ModelViewSet):
    queryset = FileModel.objects.all()
    serializer_class = DashboardArticleDocumentFileSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = []
    search_fields = []

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_article_object(self) -> Article:
        article_id = self.kwargs['article_pk']
        return get_object_or_404(Article, id=article_id)

    def get_queryset(self):
        return self.get_article_object().files.all()

    def create(self, request, *args, **kwargs):
        article = self.get_article_object()
        serializer = DashboardArticleDocumentFileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        type = serializer.validated_data.pop('type')
        file_instance = FileModel.objects.create(**serializer.validated_data, )
        if type == 'attach':
            article.files.add(file_instance)
        elif type == 'featured_image':
            article.files.add(file_instance)
            article.featured_image = file_instance
            article.save()
        headers = self.get_success_headers(serializer.data)
        return Response({
            "id": file_instance.id,
            "url": request.build_absolute_uri(file_instance.file.url),
        }, status=status.HTTP_201_CREATED, headers=headers)


class PopularArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = PopularDashboardArticleSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ArticleFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = ArticlePagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        popular_items_queryset_ids = PopularArticle.objects.filter(
            status='published').values_list('id', flat=True)
        return Article.objects.filter(popular_items__id__in=popular_items_queryset_ids)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
