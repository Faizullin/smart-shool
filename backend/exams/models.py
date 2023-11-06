from django.db import models
from students.models import Student
from polymorphic.models import PolymorphicModel
from academics.models import Subject
from utils.models import TimestampedModel

# Create your models here.


class Exam(TimestampedModel):
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

    def __str__(self):
        return f'{self.pk} | {self.exam_type} | {self.subject}'


class Quiz(TimestampedModel):
    exam = models.OneToOneField(
        Exam, null=True, blank=True, on_delete=models.SET_NULL, related_name='quiz')
    title = models.CharField(max_length=255, default='')
    duration_time = models.IntegerField(
        help_text="Duration of the quiz in seconds", default="1")

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


class Question(PolymorphicModel):
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
    quiz = models.ForeignKey(
        Quiz,
        null=True,
        blank=True,
        related_name='questions',
        on_delete=models.CASCADE
    )
    prompt = models.CharField(max_length=255, default='')

    @property
    def answers_count(self):
        return self.answers.count()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.pk}  | (quiz: {self.quiz}) | {self.type} | {self.prompt} '

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Answer(TimestampedModel):
    question = models.ForeignKey(
        Question,
        null=True,
        blank=True,
        related_name='answers',
        on_delete=models.CASCADE
    )
    content = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pk} | {self.content}'


class DraggableSubQuestion(Question):
    source_question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="draggable_subquestions")
    correct_answers = models.ManyToManyField(Answer, related_name="draggable_subquestions",)
