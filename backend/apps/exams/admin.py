from django.contrib import admin

from utils.admin import BaseAdmin
from .models import Quiz, Question, Choice, Exam


@admin.register(Quiz)
class QuizAdmin(BaseAdmin):
    pass


@admin.register(Question)
class QuestionAdmin(BaseAdmin):
    list_display = ('index', 'type', "prompt", "quiz")


@admin.register(Choice)
class ChoiceAdmin(BaseAdmin):
    list_display = ('content', 'correct')


@admin.register(Exam)
class ExamAdmin(BaseAdmin):
    pass
