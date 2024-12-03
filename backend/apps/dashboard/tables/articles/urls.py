from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import *

# router = DefaultRouter()
# router.register(r'', ArticleViewSet)
# router.register(r'<int:article_id>/files/', ArticleDocumentFileViewSet)
router = routers.SimpleRouter()
router.register(r'', ArticleViewSet)
domains_router = routers.NestedSimpleRouter(router, r'', lookup='article')
domains_router.register(r'files', ArticleDocumentFileViewSet, basename='article-files')

urlpatterns = [
    path('popular/',
         PopularArticleListView.as_view(),
         name='popular-list'
         ),
    path('<int:pk>/content/', ArticleDocumentContentViewSet.as_view()),
    path('', include(router.urls)),
    path('', include(domains_router.urls)),
]
