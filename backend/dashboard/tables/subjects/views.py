from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from academics.models import Subject
from .serializers import SubjectSerializer
from .filters import SubjectPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubjectPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
