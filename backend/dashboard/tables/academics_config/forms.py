
from django import forms
from django.urls import reverse
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from academics.models import AcademicConfig


class AcademicConfigForm(forms.ModelForm):
    class Meta:
        model = AcademicConfig
        fields = ['high_group_total_min', 'theory_pass_min','email_enabled']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        if self.instance:
            self.helper.form_action = reverse(
                'dashboard:academicconfig_edit', kwargs={'pk': self.instance.pk})
            self.helper.form_id = 'dashboard-config-form'
            self.helper.add_input(Submit('submit', 'Save', css_id='save-config-button'))
        else:
            self.helper.add_input(Submit('submit', 'Save', css_id='save-config-button'))
