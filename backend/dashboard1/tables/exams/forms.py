
from django import forms
from exams.models import Exam

class ExamForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['exam_type','exam_date','subject']