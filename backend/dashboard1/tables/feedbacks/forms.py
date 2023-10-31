
from django import forms
from results.models import Result, Feedback


class FeedbackForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={"rows": "5"}))

    class Meta:
        model = Feedback
        fields = ['result', 'content', 'watched']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        used_results = Result.objects.exclude(feedback=None)
        self.fields['result'].queryset = self.fields['result'].queryset.exclude(
            id__in=used_results.values_list(
                'feedback__id', flat=True)
        )
