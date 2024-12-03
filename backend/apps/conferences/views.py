from rest_framework import generics, permissions

from apps.accounts.permissions import get_loaded_group_names

from .models import VideoConference
from .serializers import VideoConferenceSerializer


class VideoConferenceListView(generics.ListAPIView):
    serializer_class = VideoConferenceSerializer
    permission_classes = [
        permissions.IsAuthenticated,]

    def get_queryset(self):
        queryset = VideoConference.objects.select_related(
            'admin').prefetch_related('users',).all()
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            pass
        else:
            queryset = queryset.filter(users=self.request.user)
        return queryset


class VideoConferenceDetailView(generics.RetrieveUpdateAPIView):
    queryset = VideoConference.objects.all()
    serializer_class = VideoConferenceSerializer
    permission_classes = [
        permissions.IsAuthenticated,]

    def get_queryset(self):
        queryset = VideoConference.objects.select_related(
            'admin').prefetch_related('users',).all()
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            pass
        else:
            queryset = queryset.filter(users=self.request.user)
        return queryset


# class VideoMessageListCreateView(generics.ListCreateAPIView):
#     queryset = VideoMessage.objects.all()
#     serializer_class = VideoMessageSerializer
#     permission_classes = [
#         permissions.IsAuthenticated,]

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["request"] = self.request
#         return context
