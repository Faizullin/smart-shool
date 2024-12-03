from django.db import models
from apps.students.models import Student
from apps.file_system.models import File
from utils.models import AbstractTimestampedModel


class StudentTrainFaceImage(AbstractTimestampedModel):
    image = models.ForeignKey(File, on_delete=models.CASCADE)
    student = models.ForeignKey(
        Student, null=True, on_delete=models.SET_NULL, related_name='train_face_images')

    def __str__(self) -> str:
        return f'{self.pk} | {self.student}'