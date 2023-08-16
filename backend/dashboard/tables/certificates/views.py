from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from certificates.models import Certificate
from accounts.permissions import isUserTeacher


from .forms import CertificateForm
from .tables import CertificateTable, CertificateFilter
from dashboard.models import get_teacher_certificates_queryset

from certificates.operations import generate_cert


class CertificateListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Certificate
    table_class = CertificateTable
    template_name = 'dashboard/tables/certificates/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = CertificateFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:certificate_list')
        context.update({
            "filterset": CertificateFilter(self.request.GET),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        if isUserTeacher(self.request.user):
            return get_teacher_certificates_queryset(self.request.user)
        return Certificate.objects.all()


@login_required()
def certificate_create(request):
    if request.method == 'POST':
        form = CertificateForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            generate = form.data.get('generate_image', None)
            if generate == 'on':
                cert = generate_cert(instance.student)
                cert.save()
            else:
                instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:certificate_create')}))
    else:
        form = CertificateForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:certificate_create')})


@login_required()
def certificate_edit(request, pk):
    certificate = get_object_or_404(Certificate, pk=pk)
    if request.method == 'POST':
        form = CertificateForm(request.POST, instance=certificate)
        if form.is_valid():
            instance = form.save(commit=False)
            generate = form.data.get('generate_image', None)
            if generate == 'on':
                cert = generate_cert(instance.student, instance.subject)
                cert.save()
            else:
                instance.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:certificate_edit', kwargs={'pk': certificate.pk})}))
    else:
        form = CertificateForm(instance=certificate)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:certificate_edit', kwargs={'pk': certificate.pk})})


@login_required
def certificate_delete(request, pk):
    certificate = get_object_or_404(Certificate, pk=pk)
    if request.method == 'POST':
        certificate.delete()
        return redirect('dashboard:certificate_list')
    raise Http404
