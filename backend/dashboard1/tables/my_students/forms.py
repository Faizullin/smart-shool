
from django import forms
from students.models import Student

class StudentForm(forms.ModelForm):    
    # students = forms.MultipleChoiceField(label='Students', widget=forms.SelectMultiple(attrs={'class': 'select2'}), choices= Student.objects.all())
    class Meta:
        model = Student
        fields = ['current_group']
    
    def __init__(self, request=None, *args, **kwargs):
        super(StudentForm, self).__init__(*args, **kwargs)
        self.fields['current_group'].queryset = Student.objects.filter(user=request.user)