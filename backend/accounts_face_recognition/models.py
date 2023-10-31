from django.db import models
from students.models import Student
from files.models import File
from utils.models import TimestampedModel


class StudentTrainFaceImage(TimestampedModel):
    image = models.ForeignKey(File, on_delete=models.CASCADE)
    student = models.ForeignKey(
        Student, null=True, on_delete=models.SET_NULL, related_name='train_face_images')

    def __str__(self) -> str:
        return f'{self.pk} | {self.student}'
