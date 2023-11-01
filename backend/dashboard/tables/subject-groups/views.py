from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView

from academics.models import SubjectGroup
from .serializers import SubjectGroupSerializer
from .filters import SubjectGroupPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class SubjectGroupViewSet(viewsets.ModelViewSet):
    queryset = SubjectGroup.objects.all()
    serializer_class = SubjectGroupSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = SubjectGroupPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


class SubjectGroupAssignView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsAdmin,)

    def post(self, request):
        
        return Response({'success': results}, status=status.HTTP_201_CREATED)
