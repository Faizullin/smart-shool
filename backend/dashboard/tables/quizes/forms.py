from django import forms
from django.forms.models import BaseInlineFormSet
from django.forms import formset_factory, inlineformset_factory
from exams.models import Quiz, Question, Answer


class QuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ['exam', 'title', 'time',  'start_date_time', 'end_date_time']


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['prompt']


class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['content', 'correct']


AnswerFormSet = inlineformset_factory(
    Question, Answer, form=AnswerForm, extra=1)


class BaseChildrenFormset(BaseInlineFormSet):
    def add_fields(self, form, index):
        super(BaseChildrenFormset, self).add_fields(form, index)

        # save the formset in the 'nested' property
        form.nested = AnswerFormSet(
            instance=form.instance,
            data=form.data if form.is_bound else None,
            files=form.files if form.is_bound else None,
            prefix='answer-%s-%s' % (
                form.prefix,
                AnswerFormSet.get_default_prefix()))

    def is_valid(self):
        result = super(BaseChildrenFormset, self).is_valid()
        if self.is_bound:
            for form in self.forms:
                if hasattr(form, 'nested'):
                    result = result and form.nested.is_valid()

        return result

    def save(self, commit=True):
        result = super(BaseChildrenFormset, self).save(commit=commit)
        for form in self.forms:
            if hasattr(form, 'nested'):
                if not self._should_delete_form(form):
                    form.nested.save(commit=commit)
        return result


QuestionFormSet = inlineformset_factory(
    Quiz, Question, fields=['prompt',], formset=BaseChildrenFormset, extra=1)
