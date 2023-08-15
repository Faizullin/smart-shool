from django.db import models

# Create your models here.

from students.models import Student
from academics.models import AcademicSession
from exams.models import Exam


class Result(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.SET_NULL, blank=True, null=True,
        related_name='results'
    )
    semester = models.ForeignKey(
        AcademicSession,
        on_delete=models.SET_NULL, blank=True, null=True,
        related_name='results'
    )
    exam = models.ForeignKey(
        Exam,
        on_delete=models.SET_NULL, blank=True, null=True,
        related_name='results'
    )
    practical_marks = models.SmallIntegerField(
        blank=True,
        null=True
    )
    theory_marks = models.SmallIntegerField(
        blank=True,
        null=True
    )
    total_marks = models.SmallIntegerField(
        blank=True,
        null=True
    )

    class Meta:
        unique_together = ('student', 'exam',)

    def __str__(self):
        return f'{self.pk} | {self.student} | {self.exam} | {self.total_marks}'

    def save(self, *args, **kwargs):
        if self.theory_marks and self.practical_marks:
            self.total_marks = self.practical_marks + self.theory_marks
        elif self.practical_marks and not self.theory_marks:
            self.total_marks = self.practical_marks
        else:
            self.total_marks = self.theory_marks
        super().save(*args, **kwargs)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Feedback(models.Model):
    result = models.OneToOneField(
        Result,
        blank=True, null=True,  on_delete=models.SET_NULL,
    )
    watched = models.BooleanField(default=False)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return f'{self.pk} | {self.student} | {self.exam}'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
