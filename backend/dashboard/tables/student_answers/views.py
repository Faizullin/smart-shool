from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from exams.models import StudentAnswer
from exams.operations import save_student_answer_result_score

from .forms import StudentAnswerForm
from .tables import StudentAnswerTable, StudentAnswerFilter


class StudentAnswerListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = StudentAnswer
    table_class = StudentAnswerTable
    template_name = 'dashboard/tables/student_answers/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = StudentAnswerFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:studentanswer_list')
        context.update({
            "filterset": StudentAnswerFilter(self.request.GET),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return StudentAnswer.objects.all()


@login_required()
def studentanswer_create(request):
    if request.method == 'POST':
        form = StudentAnswerForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            save_student_answer_result_score(instance)
            instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studentanswer_create')}))
    else:
        form = StudentAnswerForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studentanswer_create')})


@login_required()
def studentanswer_edit(request, pk):
    studentanswer = get_object_or_404(StudentAnswer, pk=pk)
    if request.method == 'POST':
        form = StudentAnswerForm(request.POST, instance=studentanswer)
        if form.is_valid():
            instance = form.save(commit=False)
            save_student_answer_result_score(instance)
            instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studentanswer_edit', kwargs={'pk': studentanswer.pk})}))
    else:
        form = StudentAnswerForm(instance=studentanswer)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studentanswer_edit', kwargs={'pk': studentanswer.pk})})


@login_required
def studentanswer_delete(request, pk):
    studentanswer = get_object_or_404(StudentAnswer, pk=pk)
    if request.method == 'POST':
        studentanswer.delete()
        return redirect('dashboard:studentanswer_list')
    raise Http404
