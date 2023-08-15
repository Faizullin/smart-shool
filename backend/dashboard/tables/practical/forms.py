from django import forms
from exams.models import Practical

class PracticalForm(forms.ModelForm):
    practical_file = forms.FileField(required=False)
    class Meta:
        model = Practical
        fields = ['exam','student','practical_file']