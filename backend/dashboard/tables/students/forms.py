
from django import forms
from students.models import Student
from accounts.models import User

class StudentForm(forms.ModelForm):
    hasFaceId = forms.BooleanField(required=False)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Get the instance from the form's kwargs
        instance = kwargs.get('instance')

        # Check if the instance has exactly 3 related instances
        if instance and instance.train_face_images.count() == 3:
            # Set the default value for the new field
            self.fields['hasFaceId'].initial = True
            self.fields['hasFaceId'].widget.attrs['readonly'] = True
        # Get the queryset of all users that are not linked to a profile
        # self.fields['user'].queryset = User.objects.filter(student = None)
        # self.fields['user'] = 1
    class Meta:
        model = Student
        fields = ['first_name','last_name','address','user','current_group']
        
    def clean(self):
        cleaned_data = super().clean()
        delete_relationships = cleaned_data.get('hasFaceId')
        
        if not delete_relationships:
            instance = self.instance
            if instance:
                # Delete all relationships
                instance.train_face_images.all().delete()

        return cleaned_data
        
    