from django.urls import path
from .views import VideoConferenceListView, VideoConferenceDetailView

urlpatterns = [
    path('api/v1/conferences/', VideoConferenceListView.as_view(), name='conference-list'),
    path('api/v1/conferences/<int:pk>/', VideoConferenceDetailView.as_view(), name='conference-retrieve-update'),
    # path('api/conferences/<int:pk>/messages/', VideoMessageListCreateView.as_view(), name='conference-message-list-create'),
    # path('conference/users/', VideoMessageListCreateView.as_view(), name='conference-message-list-create'),
    # path('agora-token/<str:channel_name>/', AgoraTokenView.as_view(), name='agora-token'),
]
