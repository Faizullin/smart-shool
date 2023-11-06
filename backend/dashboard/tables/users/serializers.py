from rest_framework import serializers
from accounts.models import User, Group
from utils.serializers import TimestampedSerializer


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
