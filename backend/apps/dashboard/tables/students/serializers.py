from rest_framework import serializers
from apps.students.models import Student
from apps.academics.models import Subject, SubjectGroup
from apps.dashboard.serializers import UserSerializer
from utils.serializers import TimestampedSerializer


class SubjectSerializer(TimestampedSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'created_at', 'updated_at')


class SubjectGroupSerializer(TimestampedSerializer):
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = SubjectGroup
        fields = ('id', 'title', 'subject', 'created_at', 'updated_at')


class StudentSerializer(TimestampedSerializer):
    user = UserSerializer(read_only=True)
    current_group = SubjectGroupSerializer(read_only=True)
    current_group_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=SubjectGroup.objects.all())

    class Meta:
        model = Student
        fields = ('id', 'user', 'current_group',
                  'current_group_id', 'created_at', 'updated_at')

    # def create(self, validated_data):
    #     current_group = validated_data.pop('current_group_id', None)
    #     instance = Student.objects.create(**validated_data)
    #     if current_group:
    #         instance.current_group_id = current_group.pk
    #         instance.save()
    #     return instance

    def update(self, instance: Student, validated_data):
        current_group = validated_data.pop('current_group_id', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.current_group = current_group
        instance.save()
        return instance
