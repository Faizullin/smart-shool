from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsStudent
from apps.students.models import Student
from .operations import find_student_from_face, start_train_by_student
from .serializers import (FaceImageSerializer, TrainFaceImageSerializer,
                          UserInfoSerializer)


class FaceIdLoginView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = FaceImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.validated_data.get('image')
        student = find_student_from_face(image, verbose=False)
        if student is None:
            return Response({'message': f"Student not found. {student}", "success": False},
                            status=status.HTTP_403_FORBIDDEN)
        user = student.user
        return Response(UserInfoSerializer(user).data, status=status.HTTP_201_CREATED)


class FaceIdTrainView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsStudent,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        images = request.FILES.getlist('images')
        student = get_object_or_404(Student, user_id=request.user.pk)
        if len(images) == 3:
            serilizers: list[TrainFaceImageSerializer] = []
            for image in images:
                photo_data = {}
                photo_data["student"] = student.pk
                photo_data["train_face_image"] = image
                photo_serializer = TrainFaceImageSerializer(
                    data=photo_data)
                photo_serializer.is_valid(raise_exception=True)
                serilizers.append(photo_serializer)

            student.train_face_images.all().delete()
            for photo_serializer in serilizers:
                photo_serializer.save()

            result = start_train_by_student(student)
            return Response({'success': result}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Please provide exactly three images.', "success": False},
                        status=status.HTTP_400_BAD_REQUEST)
