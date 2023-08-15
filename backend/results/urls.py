# Placeholder for urls.py
from django.urls import path
from .views import *

app_name = 'results'

urlpatterns = [
    path('api/results/my/', ResultListView.as_view(), name='exam-result-my'),
    path('api/results/stats/my/', ResultStatsListView.as_view(), name='exam-result-stats-my'),
    path('api/feedbacks/<int:exam_id>/', ExamFeedbackRetrieve.as_view(), name='exam-feedback-retrieve'),
]