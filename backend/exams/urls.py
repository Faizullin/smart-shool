from django.urls import path
from .views import *

app_name = 'exams'

urlpatterns = [
    path('api/exams/my/', ExamListView.as_view(), name='exam-list-my'),
    path('api/quizzes/my/', QuizListView.as_view(), name='quiz-list-my'),
    path('api/quizzes/<int:pk>/', QuizRetrieveView.as_view(), name='quiz-retrieve'),
    path('api/quizzes/<int:pk>/submit/', QuizSubmitView.as_view(), name='quiz-submit'),
    path('api/quizzes/<int:pk>/questions/', QuizQuestionListView.as_view(), name='quiz-question-list'),
    path('api/quizzes/intital/my/', QuizInititalMyView.as_view(), name='quiz-intital-my'),
    path('api/projects/submit/', ExamProjectSubmitView.as_view(), name='project-submit'),
    path('api/projects/<int:pk>/', ExamProjectRetrieveUpdateView.as_view(), name='project-retrieve-update-submit'),
]