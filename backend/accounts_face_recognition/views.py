from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from django.http import JsonResponse

from accounts.permissions import *
from .operations import start_train_by_student, retrain_faces, find_student_from_face
from .models import *
from students.models import Student


class FaceIdRetrainView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsAdmin,)

    def post(self, request):
        results = retrain_faces()

        return Response({'success': results}, status=status.HTTP_201_CREATED)


class FaceIdLoginView(APIView):
    permission_classes = []

    def post(self, request):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'Image file not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        student = find_student_from_face(image_file)
        print("student", student)
        if not student:
            return Response({'error': f"Student not found. {student}"}, status=status.HTTP_200_OK)
        user = student.user
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return JsonResponse(response_data)


class FaceIdVerifyView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = (permissions.IsAuthenticated, IsStudent,)

    def post(self, request):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'Image file not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        student = find_student_from_face(image_file)
        print("student", student)
        if not student:
            return Response(
                {
                    'success': False,
                    'error': f"Student not found. {student}"
                },
                status=status.HTTP_200_OK
            )
        return JsonResponse(
            {
                'success': student.user_id == request.user.pk,
            },
            status=status.HTTP_200_OK
        )
