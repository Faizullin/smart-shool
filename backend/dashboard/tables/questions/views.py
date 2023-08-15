from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 
from django.forms import modelformset_factory

from dashboard.get_context_processors import get_context
from exams.models import Question

from .forms import QuestionForm
from .tables import QuestionTable, QuestionFilter

class QuestionListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Question
    table_class = QuestionTable
    template_name = 'dashboard/tables/questions/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = QuestionFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:question_list')
        context.update({
            "filterset": QuestionFilter(),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return Question.objects.all()

@login_required()
def question_create(request):
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:question_create') }))
    else:
        form = QuestionForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:question_create') })

@login_required()
def question_edit(request, pk):
    question = get_object_or_404(Question, pk=pk)
    if request.method == 'POST':
        form = QuestionForm(request.POST, instance=question)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:question_edit', kwargs={'pk': question.pk}) }))
    else:
        form = QuestionForm(instance=question)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:question_edit', kwargs={'pk': question.pk}) })

@login_required
def question_delete(request, pk):
    question = get_object_or_404(Question, pk=pk)
    if request.method == 'POST':
        question.delete()
        return redirect('dashboard:question_list')
    raise Http404