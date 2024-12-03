from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField(read_only=True)
    target = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'level', 'recipient', 'unread',
                  'description', 'verb', 'timestamp', 'target']

    def get_timestamp(self, obj):
        return None if not obj.timestamp else obj.timestamp.strftime('%d %B %Y')

    def get_target(self, obj):
        if obj.target:
            return {
                'id': obj.target.id
            }
        return None
