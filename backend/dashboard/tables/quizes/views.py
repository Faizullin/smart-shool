from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from exams.models import Quiz

from .forms import QuizForm
from .tables import QuizTable, QuizFilter

class QuizListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Quiz
    table_class = QuizTable
    template_name = 'dashboard/tables/quizes/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = QuizFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:quiz_list')
        context.update({
            'filterset': QuizFilter(self.request.GET, queryset=Quiz.objects.all())
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return Quiz.objects.all()

@login_required()
def quiz_create(request):
    if request.method == 'POST':
        form = QuizForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:quiz_create') }))
    else:
        form = QuizForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:quiz_create')})

@login_required()
def quiz_edit(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    if request.method == 'POST':
        form = QuizForm(request.POST, instance=quiz)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk}) }))
    else:
        form = QuizForm(instance=quiz)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:quiz_edit', kwargs={'pk': quiz.pk}) })

@login_required
def quiz_delete(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    if request.method == 'POST':
        quiz.delete()
        return redirect('dashboard:quiz_list')
    raise Http404