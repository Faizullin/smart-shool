from django.db import models
from students.models import Student
from academics.models import AcademicSession
from exams.models import Exam
from files.models import File
from utils.models import TimestampedModel


class Result(TimestampedModel):
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
    practical_score = models.SmallIntegerField(
        blank=True,
        null=True
    )
    theory_score = models.SmallIntegerField(
        blank=True,
        null=True
    )
    total_score = models.SmallIntegerField(
        blank=True,
        null=True
    )
    checked = models.BooleanField(
        default=False, null=False
    )

    class Meta:
        unique_together = ('student', 'exam',)

    def __str__(self):
        return f'{self.pk} | {self.student} | {self.exam} | {self.total_marks}'

    def save(self, *args, **kwargs):
        if self.theory_score and self.practical_score:
            self.total_marks = self.theory_score + self.practical_score
        elif self.practical_score and not self.theory_score:
            self.total_marks = self.practical_score
        else:
            self.total_score = self.theory_score
        super().save(*args, **kwargs)


class SubmittedPracticalWork(TimestampedModel):
    exam = models.ForeignKey(Exam, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=100)
    file = models.ForeignKey(
        File, null=True, blank=True, on_delete=models.SET_NULL)


class Feedback(TimestampedModel):
    result = models.OneToOneField(
        Result,
        blank=True, null=True,  on_delete=models.SET_NULL,
        related_name='feedback',
    )
    watched = models.BooleanField(default=False)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return f'{self.pk} | {self.result.student} | {self.result.exam}'
