
from django import forms
from certificates.models import Certificate


class CertificateForm(forms.ModelForm):
    generate_image = forms.BooleanField(required=False)
    image = forms.ImageField(required=False)

    class Meta:
        model = Certificate
        fields = ["student", "subject", "image"]
