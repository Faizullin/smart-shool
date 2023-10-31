from django.db import models
from students.models import Student
from academics.models import Subject
from files.models import File
from utils.models import TimestampedModel

# Create your models here.


class Certificate(TimestampedModel):
    student = models.ForeignKey(Student, null=True, on_delete=models.SET_NULL)
    subject = models.ForeignKey(Subject, null=True, on_delete=models.SET_NULL)
    image = models.OneToOneField(
        File, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.student} | {self.subject.title}"
