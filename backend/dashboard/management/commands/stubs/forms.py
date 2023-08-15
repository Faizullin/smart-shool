
from django import forms
from {app_name}.models import {ModelName}

class {ModelName}Form(forms.ModelForm):    
    class Meta:
        model = {ModelName}
        fields = []