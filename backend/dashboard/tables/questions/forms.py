
from django import forms
from exams.models import Question

class QuestionForm(forms.ModelForm):    
    class Meta:
        model = Question
        fields = ['quiz','prompt','type']