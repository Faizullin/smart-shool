from django.urls import path

from .views import *

app_name = 'articles'

urlpatterns = [
    path('api/v1/articles/',
         ArticleListView.as_view(),
         name='list'
         ),
    path('api/v1/articles/popular/',
         PopularArticleListView.as_view(),
         name='popular-list'
         ),
    path('api/v1/articles/filters/',
         ArticleFiltersView.as_view(),
         name='filter-list'
         ),
    path('api/v1/articles/<int:pk>/',
         ArticleRetrieveView.as_view(),
         name='retrieve'
         ),
]
