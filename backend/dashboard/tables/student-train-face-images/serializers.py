from rest_framework import serializers
from accounts_face_recognition.models import StudentTrainFaceImage
from dashboard.serializers import FileSerializer
from dashboard.serializers import StudentSerializer
from utils.serializers import TimestampedSerializer


class StudentTrainFaceImageSerializer(TimestampedSerializer):
    image = FileSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = StudentTrainFaceImage
        fields = ('id', 'image', 'student', 'created_at', 'updated_at')
