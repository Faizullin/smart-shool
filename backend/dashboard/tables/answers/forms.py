
from django import forms
from exams.models import Answer


class AnswerForm(forms.ModelForm):

    class Meta:
        model = Answer
        fields = ['question', 'content', 'correct']
