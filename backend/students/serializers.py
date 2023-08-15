from rest_framework import serializers
from PIL import Image

from .models import Student
from accounts_face_recognition.models import StudentTrainFaceImage
from results.models import Result


class StudentSerializer(serializers.ModelSerializer):
    hasFaceId = serializers.SerializerMethodField(read_only=True)
    hasInitial = serializers.SerializerMethodField(read_only=True)
    current_group = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'current_status', 'gender', 'date_of_birth', 'others',
                  'current_group', 'date_of_admission', 'parent_mobile_number', 'address', 'created_at', 'updated_at', 'hasInitial', 'hasFaceId']
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')

    def get_hasInitial(self, obj):
        return Result.objects.filter(student=obj, exam__exam_type='i').exists()

    def get_hasFaceId(self, obj):
        return obj.train_face_images.count() > 2  # hasFaceId

    def get_current_group(self, obj: Student):
        return obj.current_group.title if obj.current_group else 'None'


class StudentProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'gender',
                  'parent_mobile_number', 'address', 'others']

    def create(self, validated_data):
        validated_data['current_status'] = 'active'
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class StudentTrainFaceImageSerializer(serializers.ModelSerializer):
    train_face_image = serializers.ImageField(write_only=True)

    class Meta:
        model = StudentTrainFaceImage
        fields = ['train_face_image', 'student']

    def create(self, validated_data):
        train_face_image = validated_data.pop(
            'train_face_image')  # Remove file from validated_data
        my_model = StudentTrainFaceImage.objects.create(**validated_data)
        my_model.train_face_image = train_face_image  # Set the file field separately
        my_model.save()
        return my_model

    def save(self, **kwargs):
        image_file = self.validated_data.get('image')
        if image_file:
            # Open the image using Pillow
            image = Image.open(image_file)

            # Save the image without compression
            image.save(image_file.name, quality=100)

        return super().save(**kwargs)
