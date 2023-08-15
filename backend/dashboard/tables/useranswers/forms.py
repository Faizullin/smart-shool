
from django import forms
from exams.models import StudentAnswer


class UserAnswerForm(forms.ModelForm):
    
    class Meta:
        model = StudentAnswer
        fields = [
            'question', 'student',  'answer', 'answer_txt', 'score'
        ]
