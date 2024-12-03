from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.academics.models import AcademicConfig
from apps.accounts.permissions import IsAdmin
from .filters import (FILTERSET_FIELDS, ORDERING_FIELDS,
                      SEARCH_FILTERSET_FIELDS)
from .serializers import AcademicConfigSerializer
from ...utils import ModelPagination


class AcademicConfigViewSet(viewsets.ModelViewSet):
    queryset = AcademicConfig.objects.all()
    serializer_class = AcademicConfigSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = ModelPagination
    search_fields = SEARCH_FILTERSET_FIELDS

    permission_classes = [permissions.IsAuthenticated, IsAdmin]


class FileSystemClearView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsAdmin,)

    def post(self, request):
        def delete_models_without_files():
            pass

        delete_models_without_files()
        return Response({
            'message': "updated succesfully",
            'success': True,
        })
