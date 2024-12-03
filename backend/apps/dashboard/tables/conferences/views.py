from rest_framework import viewsets, filters, permissions

from django_filters.rest_framework import DjangoFilterBackend
from apps.conferences.models import VideoConference
from .serializers import ConferenceSerializer
from .filters import ConferencePagination, ORDERING_FIELDS, ConferenceFilter, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.notification_system.signals import notify


class ConferenceViewSet(viewsets.ModelViewSet):
    queryset = VideoConference.objects.all()
    serializer_class = ConferenceSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ConferenceFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = ConferencePagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = VideoConference.objects.select_related(
            'project_work').prefetch_related('users', 'invited_users').all()
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            pass
        else:
            queryset = queryset.filter(users=self.request.user)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        instance: VideoConference = serializer.save()
        recipients = instance.invited_users.all()
        notify.send(self.request.user, recipient=recipients,
                    description='New conference', target=instance, verb='conference_new')

    def perform_update(self, serializer):
        prev_instance: VideoConference = self.get_object()
        instance: VideoConference = serializer.save()
        recipients = instance.invited_users.all()
        if prev_instance.planned_time != instance.planned_time:
            notify.send(self.request.user, recipient=recipients,
                        description='Conference time changed', target=instance, verb='conference_edit')
