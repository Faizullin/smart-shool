from typing import Iterable, Optional
from django.db import models
from django.conf import settings
from students.models import Student
from academics.models import SubjectGroup, Subject

# Create your models here.


class Exam(models.Model):
    EXAM_CHOICES = (
        ('i', 'Initital'),
        ('m', 'Mid Term'),
        ('f', 'Final')
    )
    exam_type = models.CharField(
        max_length=1,
        choices=EXAM_CHOICES
    )
    exam_date = models.DateTimeField()
    subject = models.ForeignKey(
        Subject, null=True, on_delete=models.SET_NULL, related_name='exams')

    def __str__(self):
        return f'{self.pk} | {self.exam_date.year} | {self.exam_type} | {self.subject}'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Quiz(models.Model):
    exam = models.OneToOneField(
        Exam, null=True, blank=True, on_delete=models.SET_NULL, related_name='quiz')
    title = models.CharField(max_length=255, default='')
    time = models.IntegerField(
        help_text="Duration of the quiz in seconds", default="1")
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField()

    @property
    def questions_count(self):
        return self.questions.count()

    def save(self, *args, **kwargs) -> None:
        if not self.title:
            self.title = f'Quiz for {self.exam}'
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Quizzes"
        ordering = ['id']

    def __str__(self):
        return f'{self.pk} | {self.title}'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Question(models.Model):
    TYPE_CHOICES = (
        ('o', 'Open-end'),
        ('c', 'Closed-end'),
    )
    quiz = models.ForeignKey(
        Quiz,
        null=True,
        blank=True,
        related_name='questions',
        on_delete=models.CASCADE
    )
    type = models.CharField(
        max_length=1,
        choices=TYPE_CHOICES,
        default='c',
    )
    prompt = models.CharField(max_length=255, default='')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.pk}  | (quiz: {self.quiz}) | {self.prompt} '

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        related_name='answers',
        on_delete=models.CASCADE
    )
    content = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pk} | {self.content}'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class StudentAnswer(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )
    selected_answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    answer_text = models.TextField(
        "Opend-ended answer",
        null=True, blank=True,
    )
    score = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.pk} | {self.student} | {self.question} | {self.question.quiz}'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Practical(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=100)
    practical_file = models.FileField(upload_to='uploads/practical_files/')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
