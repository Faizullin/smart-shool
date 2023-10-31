from django.urls import path
from .views import *

app_name = 'articles'

urlpatterns = [
    path('api/articles/',
         ArticleListView.as_view(),
         name='list'
         ),
    path('api/articles/filters/',
         ArticleFiltersView.as_view(),
         name='list'
         ),
    path('api/articles/<int:pk>/',
         ArticleRetrieveView.as_view(),
         name='retrieve'
         ),
    path('api/filters/<str:filter_type>/',
         FiltersView.as_view({'get': 'list'}), name='filters-list'),
]
