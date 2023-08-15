
from django import forms
from results.models import Feedback

class FeedbackForm(forms.ModelForm):    
    class Meta:
        model = Feedback
        fields = ['student','exam','content']