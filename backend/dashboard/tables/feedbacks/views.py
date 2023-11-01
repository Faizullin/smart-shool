from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from results.models import Feedback
from .serializers import FeedbackSerializer
from .filters import FeedbackPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = FeedbackPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
