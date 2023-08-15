from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from results.models import Feedback
from accounts.permissions import isUserTeacher

from .forms import FeedbackForm
from .tables import FeedbackTable, FeedbackFilter
from dashboard.models import get_teacher_students_results_feedbacks_queryset

class FeedbackListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Feedback
    table_class = FeedbackTable
    template_name = 'dashboard/tables/feedbacks/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = FeedbackFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:feedback_list')
        context.update({
            "filterset": FeedbackFilter(),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        if isUserTeacher(self.request.user):
            return get_teacher_students_results_feedbacks_queryset(self.request.user)
        return Feedback.objects.all()

@login_required()
def feedback_create(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:feedback_create') }))
    else:
        form = FeedbackForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form,'edit_url': reverse('dashboard:feedback_create')})

@login_required()
def feedback_edit(request, pk):
    feedback = get_object_or_404(Feedback, pk=pk)
    if request.method == 'POST':
        form = FeedbackForm(request.POST, instance=feedback)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:feedback_edit', kwargs={'pk': feedback.pk}) }))
    else:
        form = FeedbackForm(instance=feedback)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:feedback_edit', kwargs={'pk': feedback.pk}) })

@login_required
def feedback_delete(request, pk):
    feedback = get_object_or_404(Feedback, pk=pk)
    if request.method == 'POST':
        feedback.delete()
        return redirect('dashboard:feedback_list')
    raise Http404