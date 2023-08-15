from django.db import models
from students.models import Student
from academics.models import Subject

# Create your models here.


class Certificate(models.Model):
    student = models.ForeignKey(Student, null=True, on_delete=models.SET_NULL)
    subject = models.ForeignKey(Subject, null=True, on_delete=models.SET_NULL)
    image = models.ImageField(upload_to='certificates/')

    def __str__(self):
        return f"{self.student} | {self.subject.title}"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
