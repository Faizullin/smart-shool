from django.urls import path

from .views import StudentListView, StudentRetrieveMe

app_name = 'students'

urlpatterns = [
    path('api/v1/students/', StudentListView.as_view()),
    path('api/v1/students/me/', StudentRetrieveMe.as_view(),
         name='student-retrieve-me'),
    #     path('api/students/<int:pk>/', StudentRetrieveUpdateDeleteView.as_view(),
    #          name='student-retrieve-update-delete'),
]
