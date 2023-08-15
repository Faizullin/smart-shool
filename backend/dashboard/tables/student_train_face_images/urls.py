
from django.urls import path
from .views import *

urlpatterns = [
    path('', StudentTrainFaceImageListView.as_view(), name='studenttrainfaceimage_list'),
    path('create', studenttrainfaceimage_create, name='studenttrainfaceimage_create'),
    path('update/<int:pk>', studenttrainfaceimage_edit, name='studenttrainfaceimage_edit'),
    path('delete/<int:pk>', studenttrainfaceimage_delete, name='studenttrainfaceimage_delete'),
    path('retrain/', tudenttrainfaceimage_retrain, name='studenttrainfaceimage_retrain'),
]

