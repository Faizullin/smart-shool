import json
from results.serializers import ResultStatsSerializer
from results.views import get_results_data
from django.db.models import Count, Q
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from results.models import Result
from academics.models import Subject, SubjectGroup
from exams.models import Exam
from accounts.permissions import isUserTeacher, isUserAdmin

from .forms import ResultForm
from .tables import ResultTable, ResultFilter
from dashboard.models import get_teacher_students_results_queryset, get_teacher_students_queryset, Student


class ResultListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Result
    table_class = ResultTable
    template_name = 'dashboard/tables/results/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = ResultFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:result_list')
        context.update({
            "filterset": ResultFilter(),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        if isUserTeacher(self.request.user):
            return get_teacher_students_results_queryset(self.request.user)
        return Result.objects.all()


@login_required()
def result_create(request):
    if request.method == 'POST':
        form = ResultForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:result_create')}))
    else:
        form = ResultForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:result_create')})


@login_required()
def result_edit(request, pk):
    result = get_object_or_404(Result, pk=pk)
    if request.method == 'POST':
        form = ResultForm(request.POST, instance=result)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:result_edit', kwargs={'pk': result.pk})}))
    else:
        form = ResultForm(instance=result)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:result_edit', kwargs={'pk': result.pk})})


@login_required
def result_delete(request, pk):
    result = get_object_or_404(Result, pk=pk)
    if request.method == 'POST':
        result.delete()
        return redirect('dashboard:result_list')
    raise Http404


@login_required
def result_stats(request, pk):
    result = get_object_or_404(Result, pk=pk)
    student = result.student
    serializer = ResultStatsSerializer(data=request.GET)
    serializer.is_valid(raise_exception=True)
    result_filter = ResultFilter(request.GET, queryset=Result.objects.all())
    validated_data = serializer.validated_data
    results_queryset = get_results_data(
        request, validated_data, result_filter.qs)
    formatted_results_data = serializer.to_representation(results_queryset)
    context = {
        'chart_data': json.dumps(
            {
                'results_data': {
                    "this_user_data": formatted_results_data,
                    "users_avg_data": formatted_results_data,
                },
            }
        ),
        'current_student': student,
    }
    context = get_context(context=context, segment='dashboard:exam_list')

    return render(request, 'dashboard/tables/results/stats.html', context)
