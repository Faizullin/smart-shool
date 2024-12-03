from django.db import models
from apps.students.models import Student
from apps.academics.models import Subject
from apps.file_system.models import File
from utils.models import AbstractTimestampedModel

# Create your models here.


class Certificate(AbstractTimestampedModel):
    student = models.ForeignKey(Student, null=True, on_delete=models.SET_NULL)
    subject = models.ForeignKey(
        Subject, null=True, on_delete=models.SET_NULL, related_name='certificates')
    image = models.OneToOneField(
        File, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.student} | {self.subject.title}"
