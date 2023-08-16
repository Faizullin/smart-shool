
from django import forms
from crispy_forms.helper import FormHelper, Layout
from django.template.loader import render_to_string

from students.models import Student
from accounts.models import User
# from utils.fields import Select2TextInput


class StudentForm(forms.ModelForm):
    hasFaceId = forms.BooleanField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance', None)
        if instance and instance.train_face_images.count() == 3:
            self.fields['hasFaceId'].initial = True
            self.fields['hasFaceId'].widget.attrs['readonly'] = True
        
        # self.fields['user'].widget.attrs['class'] = 'select2-autocomplete'
        # self.fields['user'].queryset = User.objects.all()
        

    class Meta:
        model = Student
        fields = ['first_name', 'last_name',
                  'address', 'user', 'current_group']

    def clean(self):
        cleaned_data = super().clean()
        delete_relationships = cleaned_data.get('hasFaceId')

        if not delete_relationships:
            instance = self.instance
            if instance:
                # Delete all relationships
                instance.train_face_images.all().delete()

        return cleaned_data
