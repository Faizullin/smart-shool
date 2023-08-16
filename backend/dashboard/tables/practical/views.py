from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from exams.models import Practical

from .forms import PracticalForm
from .tables import PracticalTable, PracticalFilter


class PracticalListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Practical
    table_class = PracticalTable
    template_name = 'dashboard/tables/practical/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = PracticalFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:practical_list')
        context.update({
            "filterset": PracticalFilter(self.request.GET),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return Practical.objects.all()


@login_required()
def practical_create(request):
    if request.method == 'POST':
        form = PracticalForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:practical_create')}))
    else:
        form = PracticalForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:practical_create')})


@login_required()
def practical_edit(request, pk):
    practical = get_object_or_404(Practical, pk=pk)
    if request.method == 'POST':
        form = PracticalForm(request.POST, instance=practical)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:practical_edit', kwargs={'pk': practical.pk})}))
    else:
        form = PracticalForm(instance=practical)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:practical_edit', kwargs={'pk': practical.pk})})


@login_required
def practical_delete(request, pk):
    practical = get_object_or_404(Practical, pk=pk)
    if request.method == 'POST':
        practical.delete()
        return redirect('dashboard:practical_list')
    raise Http404
