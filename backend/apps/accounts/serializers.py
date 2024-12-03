from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from apps.students.models import Student
from .permissions import get_loaded_group_names

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    # profile_picture = serializers.SerializerMethodField(read_only=True)
    roles = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'roles', 'password',
                  # 'profile_picture'
                  )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.profile_picture.url) if obj.profile_picture else ""

    def get_roles(self, obj):
        return get_loaded_group_names(obj)


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, validators=[validate_password])
    password_confirmation = serializers.CharField(write_only=True, )
    roles = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password',
                  'password_confirmation', 'roles')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        roles = validated_data.pop('roles', [])
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        for role in roles:
            try:
                group = Group.objects.get(name=role)
                if group.name == 'student':
                    Student.objects.create(
                        user=user,
                        current_status='inactive',
                    )
                else:
                    user.groups.add(group)
            except Group.DoesNotExist:
                pass
        user.save()
        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True, write_only=True, validators=[validate_password])
    new_password_confirmation = serializers.CharField(
        required=True, write_only=True)

    class Meta:
        model = User

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirmation']:
            raise serializers.ValidationError(
                {"new_password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance


class UpdateProfileSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, )
    username = serializers.CharField(required=True)
    profile_picture = serializers.ImageField(required=False)

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError(
                {"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError(
                {"username": "This username is already in use."})
        return value

    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        image = validated_data.get('profile_picture')
        if image:
            instance.profile_picture = image
        instance.save()
        return instance
