from django.urls import path
from .views import *

app_name = 'exams'

urlpatterns = [
    path('api/v1/exams/my/', ExamListView.as_view(), name='exam-list-my'),
    path('api/v1/quizzes/<int:pk>/submit/',
         QuizSubmitView.as_view(), name='quiz-submit'),
    path('api/v1/quizzes/<int:pk>/questions/',
         QuizQuestionListView.as_view(), name='quiz-question-list'),
]
