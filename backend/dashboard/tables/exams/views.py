from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from exams.models import Exam
from accounts.permissions import isUserTeacher

from .forms import ExamForm
from .tables import ExamTable, ExamFilter
from dashboard.models import get_teacher_exams_queryset

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
            'filterset': ExamFilter(self.request.GET, queryset=Exam.objects.all())
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
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:exam_edit', kwargs={'pk': exam.pk}) })

@login_required
def exam_delete(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    if request.method == 'POST':
        exam.delete()
        return redirect('dashboard:exam_list')
    raise Http404