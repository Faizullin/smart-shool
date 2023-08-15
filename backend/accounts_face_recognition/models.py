from django.db import models
from students.models import Student
import os

# Create your models here.


def custom_upload_to(instance, filename):
    student_id = instance.student.pk
    return os.path.join('uploads', 'face_train', str(student_id), filename)


class StudentTrainFaceImage(models.Model):
    train_face_image = models.ImageField(upload_to=custom_upload_to)
    student = models.ForeignKey(
        Student, null=True, on_delete=models.SET_NULL, related_name='train_face_images')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.pk} | {self.student}'
