from django.db import models
from polymorphic.models import PolymorphicModel
from apps.students.models import Student
from apps.academics.models import AcademicSession
from apps.exams.models import Choice, Exam, Question
from utils.models import AbstractTimestampedModel


class Result(AbstractTimestampedModel):
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
    attendance = models.BooleanField(default=True)
    checked = models.BooleanField(
        default=False, null=False
    )

    class Meta:
        unique_together = ('student', 'exam',)

    def __str__(self):
        return f'{self.pk} | {self.student} | {self.exam} | {self.total_score}'

    def save(self, *args, **kwargs):
        if self.theory_score and self.practical_score:
            self.total_score = (self.theory_score + self.practical_score) / 2
        elif self.practical_score and not self.theory_score:
            self.total_score = self.practical_score / 2
        elif self.theory_score:
            self.total_score = self.theory_score / 2
        super().save(*args, **kwargs)


class Feedback(AbstractTimestampedModel):
    result = models.OneToOneField(
        Result,
        blank=True, null=True,  on_delete=models.SET_NULL,
        related_name='feedback',
    )
    watched = models.BooleanField(default=False)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return f'{self.pk} | {self.result.student} | {self.result.exam}'


class StudentAnswer(AbstractTimestampedModel):
    question = models.ForeignKey(
        Question, null=True, blank=True,
        on_delete=models.CASCADE,
    )
    result = models.ForeignKey(
        Result, on_delete=models.CASCADE,
        related_name='student_answers',
    )
    score = models.IntegerField(default=0)
    answer_choices = models.ManyToManyField(
        Choice, verbose_name='Chosen options',)
    answer_text = models.CharField(
        max_length=2048, null=True, blank=True, verbose_name='Text answer')

    def __str__(self):
        return f'{self.pk} | {self.result.student.user.username} | {self.question.prompt}'
