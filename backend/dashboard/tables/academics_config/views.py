from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from academics.models import AcademicConfig

from .forms import AcademicConfigForm
from .tables import AcademicConfigTable, AcademicConfigFilter
from dashboard.decorators import user_admin_required
from dashboard.mixins import UserAdminRequiredMixin


class AcademicConfigListView(LoginRequiredMixin, UserAdminRequiredMixin, tables.SingleTableMixin, FilterView):
    model = AcademicConfig
    table_class = AcademicConfigTable
    template_name = 'dashboard/tables/academics_config/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = AcademicConfigFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        last_academic_config = AcademicConfig.objects.last()
        context = get_context(self.request, context=context,
                              segment='dashboard:academicconfig_list')
        context.update({
            "filterset": AcademicConfigFilter(self.request.GET),
            'last_config_form': AcademicConfigForm(instance=last_academic_config)
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return AcademicConfig.objects.all()


@login_required
@user_admin_required
def academicconfig_create(request):
    if request.method == 'POST':
        form = AcademicConfigForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:academicconfig_create')}))
    else:
        form = AcademicConfigForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:academicconfig_create')})


@login_required
@user_admin_required
def academicconfig_edit(request, pk):
    academicconfig = get_object_or_404(AcademicConfig, pk=pk)
    if request.method == 'POST':
        form = AcademicConfigForm(request.POST, instance=academicconfig)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:academicconfig_edit', kwargs={'pk': academicconfig.pk})}))
    else:
        form = AcademicConfigForm(instance=academicconfig)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:academicconfig_edit', kwargs={'pk': academicconfig.pk})})


@login_required
@user_admin_required
def academicconfig_delete(request, pk):
    academicconfig = get_object_or_404(AcademicConfig, pk=pk)
    if request.method == 'POST':
        academicconfig.delete()
        return redirect('dashboard:academicconfig_list')
    raise Http404
