from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import permissions, filters, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend
from apps.notification_system.models import Notification
from .serializers import NotificationSerializer

# Create your views here.


class NotificationListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


class NotificationListView(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['id', 'unread']
    search_fields = ['id', 'verb']
    ordering_fields = ['id', 'created_at', 'updated_at']
    pagination_class = NotificationListPagination

    
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        qset = self.request.user.notifications.all().order_by('-timestamp')
        return qset


class NotificationDestroyView(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    permission_classes = [permissions.IsAuthenticated,]


class NotificationUnreadView(UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    permission_classes = [permissions.IsAuthenticated,]

    def patch(self, request, *args, **kwargs):
        instance: Notification = self.get_object()
        if instance.level == 'warning':
            verbs = instance.verb.split("|")
            if 'no_face_id' in verbs:
                student = request.user.student
                if not student.train_face_images.count() > 2:
                    return Response({
                        'detail': "You dont have face id",
                    }, status=status.HTTP_400_BAD_REQUEST)
            if 'no_subject_group' in verbs:
                student = request.user.student
                if not student.current_group:
                    return Response({
                        'detail': "You dont have subject group yet",
                    }, status=status.HTTP_400_BAD_REQUEST)
        instance.unread = False
        instance.save()
        return Response({'success': True})
