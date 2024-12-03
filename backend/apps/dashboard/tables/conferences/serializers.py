from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.conferences.models import VideoConference
from apps.dashboard.serializers import UserSerializer
from apps.project_work.models import PracticalWork
from utils.serializers import TimestampedSerializer

User = get_user_model()


class ProjectWorkSerializer(TimestampedSerializer):
    class Meta:
        model = PracticalWork
        fields = ('id', 'title', 'student', 'created_at', 'updated_at')


class ConferenceSerializer(TimestampedSerializer):
    started_at = serializers.SerializerMethodField(read_only=True)
    ended_at = serializers.SerializerMethodField(read_only=True)
    planned_time = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", input_formats=[
            "%Y/%m/%d %H:%M:%S", "%Y/%m/%d %H:%M",
            "%Y.%m.%d %H:%M:%S", "%Y.%m.%d %H:%M",
            "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M",
            "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M"
        ])
    users = UserSerializer(read_only=True, many=True)
    invited_users = UserSerializer(read_only=True, many=True)
    admin = UserSerializer(read_only=True)
    project_work = ProjectWorkSerializer(read_only=True)
    users_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, many=True
    )
    invited_users_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, many=True
    )
    admin_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    project_work_id = serializers.PrimaryKeyRelatedField(
        queryset=PracticalWork.objects.all(), write_only=True, allow_null=True
    )

    class Meta:
        model = VideoConference
        fields = ('id', 'title', 'description', 'project_work', 'admin', 'users', 'invited_users',
                  'planned_time', 'started_at', 'ended_at', 'status', 'created_at', 'updated_at', 'users_ids', 'invited_users_ids', 'admin_id', 'project_work_id')

    def get_started_at(self, obj):
        return None if not obj.created_at else obj.created_at.strftime('%d %B %Y')

    def get_ended_at(self, obj):
        return None if not obj.updated_at else obj.updated_at.strftime('%d %B %Y')

    def create(self, validated_data):
        admin = validated_data.pop('admin_id', None)
        project_work = validated_data.pop('project_work_id', None)
        users = validated_data.pop('users_ids', [])
        invited_users = validated_data.pop('invited_users_ids', [])
        instance = VideoConference.objects.create(
            **validated_data, admin=admin, project_work=project_work)
        instance.users.set(users)
        instance.invited_users.set(invited_users)
        return instance

    def update(self, instance: VideoConference, validated_data):
        admin = validated_data.pop('admin_id', None)
        project_work = validated_data.pop('project_work_id', None)
        users = validated_data.pop('users_ids', None)
        invited_users = validated_data.pop('invited_users_ids', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if admin is not None:
            instance.admin = admin
        if project_work is not None:
            instance.project_work = project_work
        planned_time = validated_data.pop('planned_time', None)
        instance.planned_time = planned_time
        instance.save()
        if users is not None:
            instance.users.set(users)
        if invited_users is not None:
            instance.invited_users.set(invited_users)
        return instance
