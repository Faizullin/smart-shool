from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from exams.models import Answer

from .forms import AnswerForm
from .tables import AnswerTable, AnswerFilter

class AnswerListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Answer
    table_class = AnswerTable
    template_name = 'dashboard/tables/answers/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = AnswerFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:answer_list')
        context.update({
            "filterset": AnswerFilter(),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return Answer.objects.all()

@login_required()
def answer_create(request):
    if request.method == 'POST':
        form = AnswerForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:answer_create') }))
    else:
        form = AnswerForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form,'edit_url': reverse('dashboard:answer_create')})

@login_required()
def answer_edit(request, pk):
    answer = get_object_or_404(Answer, pk=pk)
    if request.method == 'POST':
        form = AnswerForm(request.POST, instance=answer)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:answer_edit', kwargs={'pk': answer.pk}) }))
    else:
        form = AnswerForm(instance=answer)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:answer_edit', kwargs={'pk': answer.pk}) })

@login_required
def answer_delete(request, pk):
    answer = get_object_or_404(Answer, pk=pk)
    if request.method == 'POST':
        answer.delete()
        return redirect('dashboard:answer_list')
    raise Http404