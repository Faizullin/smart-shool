from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from students.models import Student
from django.contrib.auth.models import Group

from .forms import StudentForm
from .tables import StudentTable, StudentFilter


from dashboard.decorators import user_admin_required
from dashboard.mixins import UserAdminRequiredMixin

class StudentListView(LoginRequiredMixin, UserAdminRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Student
    table_class = StudentTable
    template_name = 'dashboard/tables/students/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = StudentFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            self.request, context=context, segment='dashboard:student_list')
        context.update({
            'filterset': StudentFilter(self.request.GET),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return Student.objects.all()


@login_required
@user_admin_required
def student_create(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:student_create')}))
    else:
        form = StudentForm()
    return render(request, 'dashboard/tables/form_base.html', {
        'form': form,
        'edit_url': reverse('dashboard:student_create'),
    })


@login_required
@user_admin_required
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
@user_admin_required
def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student.delete()
        return redirect('dashboard:student_list')
    raise Http404
