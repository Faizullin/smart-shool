from django import forms
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from exams.models import Quiz
from exams.models import Answer, Question, Quiz

from .forms import *
from .tables import QuizTable, QuizFilter

from dashboard.decorators import user_admin_or_teacher_required
from dashboard.mixins import UserAdminOrTeacherRequiredMixin


class QuizListView(LoginRequiredMixin, UserAdminOrTeacherRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Quiz
    table_class = QuizTable
    template_name = 'dashboard/tables/quizes/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = QuizFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(self.request, context=context,
                              segment='dashboard:quiz_list')
        context.update({
            'filterset': QuizFilter(self.request.GET)
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return Quiz.objects.all()


@login_required
@user_admin_or_teacher_required
def quiz_create(request):
    if request.method == 'POST':
        quiz_form = QuizForm(request.POST)
        if quiz_form.is_valid():
            quiz = quiz_form.save()
            question_formset = QuestionFormSet(request.POST, instance=quiz)
            if question_formset.is_valid():
                question_formset.save()
                return redirect(reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk, }))
            else:
                return redirect(reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk, }))
        else:
            question_formset = QuestionFormSet(instance=Quiz())
    else:
        quiz_form = QuizForm()
        question_formset = QuestionFormSet(instance=Quiz())
    context = {
        'quiz_form': quiz_form,
        'question_formset': question_formset,
        'edit_url': reverse('dashboard:quiz_create'),
    }
    context.update(get_context(request, context=context,
                   segment='dashboard:quiz_list'))
    return render(request, 'dashboard/tables/quizes/form.html', context)


@login_required
@user_admin_or_teacher_required
def quiz_edit(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    if request.method == 'POST':
        quiz_form = QuizForm(request.POST, instance=quiz)
        if quiz_form.is_valid():
            updated_quiz = quiz_form.save()
            question_formset = QuestionFormSet(
                request.POST, instance=updated_quiz)
            question_formset.is_valid()
            if question_formset.is_valid():
                question_formset.save()
                return redirect(reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk, }))
        else:
            question_formset = QuestionFormSet(instance=Quiz())
    else:
        quiz_form = QuizForm(instance=quiz)
        question_formset = QuestionFormSet(instance=quiz)
    context = {
        'quiz_form': quiz_form,
        'question_formset': question_formset,
        'edit_url': reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk}),
    }
    context.update(get_context(request, context=context,
                   segment='dashboard:quiz_list'))
    return render(request, 'dashboard/tables/quizes/form.html', context)


@login_required
@user_admin_or_teacher_required
def quiz_delete(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    if request.method == 'POST':
        quiz.delete()
        return redirect('dashboard:quiz_list')
    raise Http404
