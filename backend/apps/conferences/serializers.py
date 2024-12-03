from rest_framework import serializers
from utils.serializers import TimestampedSerializer
from .models import VideoConference, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', )


class VideoConferenceSerializer(TimestampedSerializer):
    admin = UserSerializer(read_only=True)
    users = UserSerializer(read_only=True, many=True)
    started_at = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%d %H:%M:%S")
    planned_time = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%d %H:%M:%S")
    ended_at = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = VideoConference
        fields = ('id', 'title', 'admin',  'users', 'started_at', 'planned_time',
                  'ended_at', 'status', 'description', 'created_at', 'updated_at')

    def update(self, instance: VideoConference, validated_data):
        # Only allow restart
        status = validated_data.pop("status", None)
        if status is not None:
            instance.status = status
        instance.save()
        return instance
