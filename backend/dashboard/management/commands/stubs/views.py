from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from {app_name}.models import {ModelName}

from .forms import {ModelName}Form
from .tables import {ModelName}Table, {ModelName}Filter
from dashboard.decorators import user_admin_or_teacher_required
from dashboard.mixins import UserAdminOrTeacherRequiredMixin

class {ModelName}ListView(LoginRequiredMixin, UserAdminOrTeacherRequiredMixin, tables.SingleTableMixin, FilterView):
    model = {ModelName}
    table_class = {ModelName}Table
    template_name = 'dashboard/tables/{app_name}/{slodo_name}'
    paginator_class = tables.LazyPaginator
    filterset_class = {ModelName}Filter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(self.request, context=context, segment='dashboard:{verbal_url_name}_list')
        context.update({
            "filterset": {ModelName}Filter(self.request.GET, queryset = self.get_queryset()),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return {ModelName}.objects.all()

@login_required
@user_admin_or_teacher_required
def {verbal_url_name}_create(request):
    if request.method == 'POST':
        form = {ModelName}Form(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:{verbal_url_name}_create') }))
    else:
        form = {ModelName}Form()
    return render(request, 'dashboard/tables/form_base.html', {'form': form,'edit_url': reverse('dashboard:{verbal_url_name}_create')})

@login_required
@user_admin_or_teacher_required
def {verbal_url_name}_edit(request, pk):
    {verbal_url_name} = get_object_or_404({ModelName}, pk=pk)
    if request.method == 'POST':
        form = {ModelName}Form(request.POST, instance={verbal_url_name})
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:{verbal_url_name}_edit', kwargs={'pk': {verbal_url_name}.pk}) }))
    else:
        form = {ModelName}Form(instance={verbal_url_name})
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:{verbal_url_name}_edit', kwargs={'pk': {verbal_url_name}.pk}) })

@login_required
@user_admin_or_teacher_required
def {verbal_url_name}_delete(request, pk):
    {verbal_url_name} = get_object_or_404({ModelName}, pk=pk)
    if request.method == 'POST':
        {verbal_url_name}.delete()
        return redirect('dashboard:{verbal_url_name}_list')
    raise Http404