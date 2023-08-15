
from django import forms
from accounts.models import User

class UserForm(forms.ModelForm):    
    class Meta:
        model = User
        fields = ['username', 'email', 'approval_status','profile_picture']