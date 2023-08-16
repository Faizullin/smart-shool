from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from accounts.models import User, Group

from .forms import TeacherForm
from .tables import TeacherTable, TeacherFilter


class TeacherListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = User
    table_class = TeacherTable
    template_name = 'dashboard/tables/teachers/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = TeacherFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:teacher_list')
        context.update({
            "filterset": TeacherFilter(self.request.GET),
        })
        return context

    def get_queryset(self):
        users = super().get_queryset()
        return users.filter(groups__name='teacher')


@login_required()
def teacher_create(request):
    if request.method == 'POST':
        form = TeacherForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:teacher_create')}))
    else:
        form = TeacherForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:teacher_create')})


@login_required()
def teacher_edit(request, pk):
    teacher = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        form = TeacherForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:teacher_edit', kwargs={'pk': teacher.pk})}))
    else:
        form = TeacherForm(instance=teacher)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:teacher_edit', kwargs={'pk': teacher.pk})})


@login_required
def teacher_delete(request, pk):
    teacher = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        teacher.groups.remove(Group.objects.get(name='teacher'))
        return redirect('dashboard:teacher_list')
    raise Http404
