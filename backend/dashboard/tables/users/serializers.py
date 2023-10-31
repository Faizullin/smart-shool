from rest_framework import serializers
from accounts.models import User
from utils.serializers import TimestampedSerializer


class UserSerializer(TimestampedSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'approval_status',
                  'created_at', 'updated_at')
