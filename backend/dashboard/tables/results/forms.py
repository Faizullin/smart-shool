
from django import forms
from results.models import Result


class ResultForm(forms.ModelForm):
    class Meta:
        model = Result
        fields = ['id', 'exam', 'student', 'semester',
                  'practical_marks', 'theory_marks', 'total_marks',]
