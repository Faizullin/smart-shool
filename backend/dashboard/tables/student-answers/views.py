from rest_framework import viewsets, filters, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
# from results.models import StudentAnswer
# from .serializers import StudentAnswerPolymorphicSerializer
from .filters import StudentAnswerPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS
from accounts.permissions import IsAdmin


# class StudentAnswerViewSet(viewsets.ModelViewSet):
#     queryset = StudentAnswer.objects.all()
#     serializer_class = StudentAnswerPolymorphicSerializer
#     filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
#     filterset_fields = FILTERSET_FIELDS
#     ordering_fields = ORDERING_FIELDS
#     pagination_class = StudentAnswerPagination
#     search_fields = SEARCH_FILTERSET_FIELDS
#     authentication_classes = (JWTAuthentication,)
#     permission_classes = [permissions.IsAuthenticated, IsAdmin]
