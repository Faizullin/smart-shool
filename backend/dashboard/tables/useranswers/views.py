from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from exams.models import StudentAnswer, Quiz
from results.models import Result
from students.models import Student
from dashboard.models import save_student_answer_result_score

from .forms import UserAnswerForm
from .tables import UserAnswerTable, UserAnswerFilter


class UserAnswerListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = StudentAnswer
    table_class = UserAnswerTable
    template_name = 'dashboard/tables/useranswers/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = UserAnswerFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:useranswer_list')
        context.update({
            "filterset": UserAnswerFilter(),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return StudentAnswer.objects.all()


@login_required()
def useranswer_create(request):
    if request.method == 'POST':
        form = UserAnswerForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            save_student_answer_result_score(instance)
            instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:useranswer_create')}))
    else:
        form = UserAnswerForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:useranswer_create')})


@login_required()
def useranswer_edit(request, pk):
    useranswer = get_object_or_404(StudentAnswer, pk=pk)
    if request.method == 'POST':
        form = UserAnswerForm(request.POST, instance=useranswer)
        if form.is_valid():
            instance = form.save(commit=False)
            save_student_answer_result_score(instance)
            instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:useranswer_edit', kwargs={'pk': useranswer.pk})}))
    else:
        form = UserAnswerForm(instance=useranswer)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:useranswer_edit', kwargs={'pk': useranswer.pk})})


@login_required
def useranswer_delete(request, pk):
    useranswer = get_object_or_404(StudentAnswer, pk=pk)
    if request.method == 'POST':
        useranswer.delete()
        return redirect('dashboard:useranswer_list')
    raise Http404
