from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from students.models import Student
from academics.models import Subject, SubjectGroup, AcademicSession

from .forms import StudentForm
from .tables import StudentTable, StudentFilter
from dashboard.models import get_students_with_initial_test


class StudentListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Student
    table_class = StudentTable
    template_name = 'dashboard/tables/assign_subject_groups/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = StudentFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:student_list')
        context.update({
            "filterset": StudentFilter(),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return Student.objects.all()


@login_required
def assign_subject_groups(request):
    context = get_context(segment='dashboard:assign_subject_groups_list')
    tmp_data = get_students_with_initial_test()
    data = {}
    for key in tmp_data.keys():
        data[Subject.objects.get(id=key).title] = tmp_data[key]
    context['data'] = data
    return render(request, 'dashboard/tables/assign_subject_groups/index.html', context=context)


@login_required()
def assign_subject_groups_save(request):
    data = get_students_with_initial_test()
    for subject_id, item in data.items():
        for item_key in range(len(item)):
            subject_group = SubjectGroup.objects.create(
                semester = AcademicSession.objects.last(),
                subject_id = subject_id,
                teacher = None,
            )
            for student in item[item_key]:
                student.current_group = subject_group
                student.save()
    return redirect(reverse('dashboard:student_list'))


@login_required()
def student_edit(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:student_edit', kwargs={'pk': student.pk})}))
    else:
        form = StudentForm(instance=student)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:student_edit', kwargs={'pk': student.pk})})


@login_required
def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student.delete()
        return redirect('dashboard:student_list')
    raise Http404
