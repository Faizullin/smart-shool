
from django import forms
from results.models import Feedback


class FeedbackForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={"rows": "5"}))

    class Meta:
        model = Feedback
        fields = ['result', 'content', 'watched']
