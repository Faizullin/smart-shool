from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsTeacherOrAdmin, get_loaded_group_names
from apps.chats.models import ChatMessage
from apps.chats.operations import get_raw_response
from apps.dashboard.models import get_teacher_students_results_feedbacks_queryset
from apps.notification_system.signals import notify
from apps.results.models import Feedback
from .filters import FeedbackPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from .serializers import FeedbackSerializer


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = FeedbackPagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_queryset(self):
        group_names = get_loaded_group_names(self.request.user)
        if 'admin' in group_names:
            return Feedback.objects.all()
        return get_teacher_students_results_feedbacks_queryset(self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feedback: Feedback = serializer.save()
        recipient = feedback.result.student.user
        notification_context = [
            f"New feedback available on passed results: Exam({'Unknown' if not feedback.result.exam else feedback.result.exam.pk})"
        ]
        notify.send(
            self.request.user,
            recipient=recipient,
            level='info',
            verb='new_feedback',
            description='\n'.join(notification_context),
        )
        return Response(FeedbackSerializer(feedback).data, status=status.HTTP_201_CREATED)


class ParaphraseApiView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def post(self, request):
        prompt = self.request.data['prompt']
        prompt = "Paraphrase: " + prompt

        virtual_obj = ChatMessage(
            msg=prompt
        )
        response = get_raw_response(virtual_obj, None)
        return Response({
            "data": response
        })
