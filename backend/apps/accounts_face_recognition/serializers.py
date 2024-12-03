from PIL import Image
from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.file_system.models import File as FileModel
from apps.students.models import Student
from .models import StudentTrainFaceImage

User = get_user_model()


class FaceImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = StudentTrainFaceImage
        fields = ('id', 'image',)

    def validate_image(self, value):
        max_size = 2 * 1024 * 1024  # 2MB, adjust as needed
        if value.size > max_size:
            raise serializers.ValidationError("The image size is too large.")
        return value


class TrainFaceImageSerializer(serializers.ModelSerializer):
    train_face_image = serializers.ImageField(write_only=True)

    class Meta:
        model = StudentTrainFaceImage
        fields = ('id', 'train_face_image', 'student')

    def validate_train_face_image(self, value):
        max_size = 2 * 1024 * 1024  # 2MB, adjust as needed
        if value.size > max_size:
            raise serializers.ValidationError("The image size is too large.")
        return value

    def create(self, validated_data):
        train_face_image = validated_data.pop(
            'train_face_image')  # Remove file from validated_data
        image_instance = FileModel.objects.create(
            file=train_face_image,
        )
        instance = StudentTrainFaceImage.objects.create(
            **validated_data, image=image_instance)
        instance.save()
        return instance

    def save(self, **kwargs):
        image_file = self.validated_data.get('image')
        if image_file:
            # Open the image using Pillow
            image = Image.open(image_file)

            # Save the image without compression
            image.save(image_file.name, quality=100)

        return super().save(**kwargs)


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')


class StudentInfoSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user')
