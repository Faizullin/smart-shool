from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers

from utils.serializers import TimestampedSerializer

User = get_user_model()


class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', )


class UserSerializer(TimestampedSerializer):
    groups = UserGroupSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups', 'approval_status',
                  'created_at', 'updated_at')
