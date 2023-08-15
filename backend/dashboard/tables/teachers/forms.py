from django import forms
from accounts.models import User, Group
from academics.models import SubjectGroup

class TeacherForm(forms.Form):
    user = forms.ModelChoiceField(
        queryset=User.objects.all(), label='Select User', empty_label="Select a user")

    def __init__(self, *args, **kwargs):
        self.instance = kwargs.pop('instance', None)
        super(TeacherForm, self).__init__(*args, **kwargs)

        if self.instance:
            self.fields['user'].initial = self.instance

    def save(self):
        user = self.cleaned_data['user']
        prev_user = self.instance
        if prev_user:
            subject_groups = SubjectGroup.objects.filter(teacher=prev_user)
            for obj in subject_groups:
                obj.teacher = user
                obj.save()
            prev_user.groups.remove(Group.objects.filter(name='teacher').first())
        user.groups.set(Group.objects.filter(name='teacher'))
