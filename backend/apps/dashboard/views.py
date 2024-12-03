from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from apps.accounts.permissions import IsAdmin
from .serializers import DiskSpaceSerializer
import psutil


class DiskSpaceView(APIView):
    
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get(self, request):
        root_disk_space_info = self.get_disk_space('/')
        return Response(DiskSpaceSerializer(root_disk_space_info).data, status=status.HTTP_200_OK)

    def get_disk_space(self, path):
        disk_usage = psutil.disk_usage(path)
        return {
            'total_space': disk_usage.total,
            'used_space': disk_usage.used,
            'free_space': disk_usage.free,
            'percent_used': disk_usage.percent,
        }
