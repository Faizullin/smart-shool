import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from exams.models import Exam
from results.models import Result
from academics.models import get_current_academic_config, Subject, SubjectGroup
from accounts.permissions import isUserTeacher, isUserAdmin
from students.models import Student

from .forms import ExamForm
from .tables import ExamTable, ExamFilter, ExamStudentDataTable
from dashboard.models import get_teacher_exams_queryset, get_teacher_students_queryset


class ExamListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Exam
    table_class = ExamTable
    template_name = 'dashboard/tables/exams/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = ExamFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:exam_list')
        context.update({
            'filterset': ExamFilter(self.request.GET)
        })
        return context

    def get_queryset(self, *args, **kwargs):
        if isUserTeacher(self.request.user):
            return get_teacher_exams_queryset(self.request.user)
        return Exam.objects.all()


@login_required()
def exam_create(request):
    if request.method == 'POST':
        form = ExamForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form}))
    else:
        form = ExamForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:exam_create')})


@login_required()
def exam_edit(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    if request.method == 'POST':
        form = ExamForm(request.POST, instance=exam)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form}))
    else:
        form = ExamForm(instance=exam)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:exam_edit', kwargs={'pk': exam.pk})})


@login_required
def exam_delete(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    if request.method == 'POST':
        exam.delete()
        return redirect('dashboard:exam_list')
    raise Http404


@login_required
def exam_stats(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    current_academic_config = get_current_academic_config()
    students_queryset = []
    if isUserTeacher(request.user):
        students_queryset = get_teacher_students_queryset(request.user)
    elif isUserAdmin(request.user):
        students_queryset = Student.objects.all()
    exam_results_queryset = Result.objects.filter(exam=exam)
    exam_students_queryset = students_queryset.filter(
        current_group__in=SubjectGroup.objects.filter(subject=exam.subject),
    )
    exam_students_with_results_queryset = exam_students_queryset.filter(
        results__in=exam_results_queryset,
    )
    # print("Data",'* +',exam_students_with_results_queryset, '=',exam_students_queryset)
    for student_item in exam_students_queryset:
        student_result_queryset = student_item.results.filter(exam=exam)
        if student_result_queryset.exists():
            marks = student_result_queryset.last().total_marks
            student_item.pass_status = 'Passed' if marks > current_academic_config.high_group_total_min else 'Failed'
            student_item.total_marks = marks
        else:
            student_item.pass_status = 'Absent'

    exam_students_total_count = exam_students_queryset.count()
    exam_students_tried_count = exam_students_with_results_queryset.count()
    absent_count = exam_students_total_count - exam_students_tried_count
    passed_count = exam_students_with_results_queryset.filter(
        results__total_marks__gt=current_academic_config.high_group_total_min).count()
    failed_count = exam_students_tried_count - passed_count

    context = {
        'chart_data': json.dumps(
            {
                'attendance_data': {
                    "data": [passed_count, absent_count, failed_count,]
                },
            }
        ),
        'table': ExamStudentDataTable(exam_students_queryset)
    }
    context = get_context(context=context, segment='dashboard:exam_list')
    return render(request, 'dashboard/tables/exams/stats.html', context)
