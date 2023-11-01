from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView

from accounts_face_recognition.models import StudentTrainFaceImage
from .serializers import StudentTrainFaceImageSerializer
from .filters import StudentTrainFaceImagePagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


class StudentTrainFaceImageViewSet(viewsets.ModelViewSet):
    queryset = StudentTrainFaceImage.objects.all()
    serializer_class = StudentTrainFaceImageSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = StudentTrainFaceImagePagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


class FaceIdRetrainView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsAdmin,)

    def post(self, request):
        results = retrain_faces()
        return Response({'success': results}, status=status.HTTP_201_CREATED)