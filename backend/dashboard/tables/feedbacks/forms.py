
from django import forms
from results.models import Feedback


class FeedbackForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={"rows": "5"}))

    def __init__(self, *args, **kwargs):
        super(FeedbackForm, self).__init__(*args, **kwargs)
        if self.instance:
            self.initial['result'] = self.instance.result

    class Meta:
        model = Feedback
        fields = ['result', 'content', 'watched']
