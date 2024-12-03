from rest_framework import serializers
from apps.notification_system.models import Notification
from utils.serializers import TimestampedSerializer
from apps.dashboard.serializers import UserSerializer, StudentSerializer, User


class NotificationSerializer(serializers.ModelSerializer):
    recipient = UserSerializer(read_only=True)
    recipient_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=True, queryset=User.objects.all())
    unread = serializers.BooleanField(read_only=True)
    target = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = ('id',  'level', 'target',
                  'recipient', 'recipient_id', 'unread', 'description', 'verb')

    def update(self, instance: Notification, validated_data):
        recipient = validated_data.pop('recipient_id')
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def get_target(self, obj):
        if obj.target:
            return {
                'id': obj.target.id
            }
        return None
