from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from .serializers import NotificationSerializer
from .filters import NotificationPagination, ORDERING_FIELDS, NotificationFilter, SEARCH_FILTERSET_FIELDS
from apps.accounts.permissions import IsTeacherOrAdmin
from apps.notification_system.models import Notification
from apps.notification_system.signals import notify


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = NotificationFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = NotificationPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        queryset = Notification.objects.all()
        return queryset.prefetch_related('recipient','target',).all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        recipient = serializer.validated_data.pop('recipient_id')
        description = serializer.validated_data.pop('description', '')
        data = notify.send(self.request.user,
                           recipient=recipient, verb='you reached level 10', description=description)
        return Response(NotificationSerializer(data[0][1][0]).data, status=status.HTTP_201_CREATED)
