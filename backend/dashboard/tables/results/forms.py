
from django import forms
from results.models import Result


class ResultForm(forms.ModelForm):
    checked_n = forms.BooleanField(label="Checked", required=False)

    class Meta:
        model = Result
        fields = ['id', 'exam', 'student', 'semester',
                  'practical_marks', 'theory_marks', 'total_marks', ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance', None)
        if instance:
            self.fields['checked_n'].initial = bool(instance.checked)
