
from django import forms
from exams.models import StudentAnswer, Answer

class StudentAnswerForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance', None)
        if instance and instance.question:
            if instance.question.type == 'c':
                self.fields['selected_answer'].queryset = Answer.objects.filter(question=instance.question) 
            elif instance.question.type == 'o':
                self.fields['selected_answer'].queryset = Answer.objects.none()
        else:
            self.fields['selected_answer'].queryset = Answer.objects.none()
    class Meta:
        model = StudentAnswer
        fields = ['question', 'student', 'selected_answer', 'answer_text', 'score']