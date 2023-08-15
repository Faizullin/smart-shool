
from django import forms
from students.models import SubjectGroup

class SubjectGroupForm(forms.ModelForm):    
    class Meta:
        model = SubjectGroup
        fields = ['semester','subject','teacher']