from django.core.exceptions import ObjectDoesNotExist
from apps.notification_system.signals import notify
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import get_loaded_group_names
from .serializers import *

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if 'student' in get_loaded_group_names(user):
            notify.send(
                User.objects.get(pk=1),
                recipient=user,
                level='warning',
                verb='welcome|no_face_id|no_subject_group',
                description='Thank you for registering on our website. Please pass initial test to select subject group! and laso add face id!',
            )
        return Response(serializer.data)


class AuthProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            user_data = user
            data = UserSerializer(user_data, context={'request': request}).data
            return Response(data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': f"No user data with id {user} found"}, status=status.HTTP_404_NOT_FOUND)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user
