from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from results.models import SubmittedPracticalWork
from .serializers import SubmittedPracticalWorkSerializer
from .filters import SubmittedPracticalWorkPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class SubmittedPracticalWorkViewSet(viewsets.ModelViewSet):
    queryset = SubmittedPracticalWork.objects.all()
    serializer_class = SubmittedPracticalWorkSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubmittedPracticalWorkPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
