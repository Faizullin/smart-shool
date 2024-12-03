from django.db import models

from apps.academics.models import Subject, SubjectGroup
from utils.models import AbstractTimestampedModel


# Create your models here.


class Exam(AbstractTimestampedModel):
    EXAM_CHOICES = (
        ('i', 'Initital'),
        ('m', 'Mid Term'),
        ('f', 'Final')
    )
    exam_type = models.CharField(
        max_length=1,
        choices=EXAM_CHOICES
    )
    subject = models.ForeignKey(
        Subject, null=True, on_delete=models.SET_NULL, related_name='exams')
    subject_groups = models.ManyToManyField(
        SubjectGroup, related_name="subject_groups", )

    def __str__(self):
        return f'{self.pk} | {self.exam_type} | {self.subject}'


class Quiz(AbstractTimestampedModel):
    exam = models.OneToOneField(
        Exam, null=True, blank=True, on_delete=models.SET_NULL, related_name='quiz')
    title = models.CharField(max_length=255, default='')

    def save(self, *args, **kwargs) -> None:
        if not self.title:
            self.title = f'Quiz for {self.exam}'
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Quizzes"
        ordering = ['id']

    def __str__(self):
        return f'{self.pk} | {self.title}'


class Question(AbstractTimestampedModel):
    TYPE_CHOICES = (
        ('o', 'Open-end'),
        ('c', 'Closed-end'),
        ('d', 'Draggable'),
    )
    type = models.CharField(
        max_length=1,
        choices=TYPE_CHOICES,
        default='c',
    )
    index = models.IntegerField(null=True, blank=True)
    quiz = models.ForeignKey(
        Quiz,
        null=True,
        blank=True,
        related_name='questions',
        on_delete=models.CASCADE
    )
    parent_question = models.ForeignKey(
        'Question', null=True, blank=True, on_delete=models.CASCADE, related_name="subquestions")
    prompt = models.TextField(default='')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.pk}  | (quiz: {self.quiz}) | {self.type} | {self.prompt} '


class Choice(AbstractTimestampedModel):
    class Meta:
        verbose_name = 'Answer choice'
        verbose_name_plural = 'Answer choices'
        ordering = ('id',)

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, verbose_name='Question', related_name='choices', )
    content = models.CharField(
        max_length=1023, null=False, blank=False, verbose_name='Question text')
    correct = models.BooleanField(
        default=False, verbose_name='Is it right choice?')

    def __str__(self):
        return f'{self.pk} | {self.content}'
