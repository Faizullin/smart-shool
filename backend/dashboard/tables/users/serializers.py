from rest_framework import serializers
from accounts.models import User
from utils.serializers import TimestampedSerializer


class UserGroupSerializer(TimestampedSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'created_at', 'updated_at')


class UserSerializer(TimestampedSerializer):
    groups = UserGroupSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups', 'approval_status',
                  'created_at', 'updated_at')