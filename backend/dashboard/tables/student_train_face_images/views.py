from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from accounts_face_recognition.models import StudentTrainFaceImage

from .forms import StudentTrainFaceImageForm
from .tables import StudentTrainFaceImageTable, StudentTrainFaceImageFilter

from accounts_face_recognition.operations import retrain_faces


class StudentTrainFaceImageListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = StudentTrainFaceImage
    table_class = StudentTrainFaceImageTable
    template_name = 'dashboard/tables/student_train_face_images/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = StudentTrainFaceImageFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:studenttrainfaceimage_list')
        context.update({
            "filterset": StudentTrainFaceImageFilter(),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return StudentTrainFaceImage.objects.all()


@login_required()
def studenttrainfaceimage_create(request):
    if request.method == 'POST':
        form = StudentTrainFaceImageForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studenttrainfaceimage_create')}))
    else:
        form = StudentTrainFaceImageForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studenttrainfaceimage_create')})


@login_required()
def studenttrainfaceimage_edit(request, pk):
    studenttrainfaceimage = get_object_or_404(StudentTrainFaceImage, pk=pk)
    if request.method == 'POST':
        form = StudentTrainFaceImageForm(
            request.POST, instance=studenttrainfaceimage)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studenttrainfaceimage_edit', kwargs={'pk': studenttrainfaceimage.pk})}))
    else:
        form = StudentTrainFaceImageForm(instance=studenttrainfaceimage)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:studenttrainfaceimage_edit', kwargs={'pk': studenttrainfaceimage.pk})})


@login_required
def studenttrainfaceimage_delete(request, pk):
    studenttrainfaceimage = get_object_or_404(StudentTrainFaceImage, pk=pk)
    if request.method == 'POST':
        studenttrainfaceimage.delete()
        return redirect('dashboard:studenttrainfaceimage_list')
    raise Http404


@login_required
def tudenttrainfaceimage_retrain(request):
    retrain_faces()
    return redirect(reverse('dashboard:studenttrainfaceimage_list'))
