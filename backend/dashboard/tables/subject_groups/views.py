from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from students.models import SubjectGroup
from accounts.permissions import isUserTeacher

from .forms import SubjectGroupForm
from .tables import SubjectGroupTable, SubjectGroupFilter
from dashboard.models import get_teacher_subject_groups_queryset

class SubjectGroupListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = SubjectGroup
    table_class = SubjectGroupTable
    template_name = 'dashboard/tables/subject_groups/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = SubjectGroupFilter


    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:subjectgroup_list')
        context.update({
            "filterset": SubjectGroupFilter(self.request.GET),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        if isUserTeacher(self.request.user):
            return get_teacher_subject_groups_queryset(self.request.user)
        return SubjectGroup.objects.order_by('-id') 
    
@login_required()
def subjectgroup_create(request):
    if request.method == 'POST':
        form = SubjectGroupForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:subjectgroup_create') }))
    else:
        form = SubjectGroupForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form,'edit_url': reverse('dashboard:subjectgroup_create')})

@login_required()
def subjectgroup_edit(request, pk):
    subjectgroup = get_object_or_404(SubjectGroup, pk=pk)
    if request.method == 'POST':
        form = SubjectGroupForm(request.POST, instance=subjectgroup)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:subjectgroup_edit', kwargs={'pk': subjectgroup.pk}) }))
    else:
        form = SubjectGroupForm(instance=subjectgroup)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:subjectgroup_edit', kwargs={'pk': subjectgroup.pk}) })

@login_required
def subjectgroup_delete(request, pk):
    subjectgroup = get_object_or_404(SubjectGroup, pk=pk)
    if request.method == 'POST':
        subjectgroup.delete()
        return redirect('dashboard:subjectgroup_list')
    raise Http404