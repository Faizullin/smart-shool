# Placeholder for urls.py
from django.urls import path
from .views import *

app_name = 'results'

urlpatterns = [
    path('api/v1/results/my/', ResultListView.as_view(), name='result-list-my'),
    path('api/v1/results/stats/my/', ResultStatsListView.as_view(), name='result-stats-my'),
    path('api/v1/feedbacks/<int:exam_id>/', ExamFeedbackRetrieve.as_view(), name='feedback-retrieve'),
    path("api/v1/export/result/<str:format_type>/", ResultDownloadFileView.as_view(), name="export-data"),
]