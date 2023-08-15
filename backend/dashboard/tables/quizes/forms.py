from django import forms
from exams.models import Quiz


class QuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ['exam', 'title', 'time',
                  'start_date_time', 'end_date_time', ]
