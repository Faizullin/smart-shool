from django.urls import path
from .views import *

app_name = 'students'

urlpatterns = [
    #path('api/students', StudentListView.as_view()),
    path('api/students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('api/students/me/',  StudentRetrieveMe.as_view(), name='student-retrieve-me'),
    path('api/students/me/train_face/', StudentTrainFaceMe.as_view(), name='student-train_face-me'),
    # path('api/students/me/', StudentProfileUpdateView.as_view(), name='student-profile-update'),
    path('api/students/<int:pk>/', StudentRetrieveUpdateDeleteView.as_view(), name='student-retrieve-update-delete'),
]