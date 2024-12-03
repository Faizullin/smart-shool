from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView

from apps.file_system.models import File
from .serializers import FileSerializer


class FileDetailView(RetrieveAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    permission_classes = [permissions.IsAuthenticated, ]
