
from django.urls import path
from .views import *

urlpatterns = [
    path('', ArticleListView.as_view(), name='article_list'),
    path('create', article_create, name='article_create'),
    path('update/<int:pk>', article_edit, name='article_edit'),
    path('delete/<int:pk>', article_delete, name='article_delete'),
]