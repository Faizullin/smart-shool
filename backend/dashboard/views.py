import os
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.conf import settings
from django.http import Http404, JsonResponse
from django.core.files.storage import default_storage

from academics.models import AcademicConfig
from results.models import Result
from accounts.models import User
from accounts.permissions import isUserTeacher
from .models import get_teacher_students_queryset, get_teacher_students_results_queryset
from .decorators import user_admin_or_teacher_required, user_admin_required
# from dashboard.tables.academics_config.forms import AcademicConfigForm
from .get_context_processors import *
# Create your views here.


@login_required
@user_admin_or_teacher_required
def dashboard_index(request):
    last_academic_config = AcademicConfig.objects.last()
    context = get_context(request, segment='dashboard:index')
    context.update({
        'unchecked_results_count': get_teacher_students_results_queryset(request.user).count() if isUserTeacher(request.user) else Result.objects.filter(checked=False).count(),
        'students_count': get_teacher_students_queryset(request.user).count() if isUserTeacher(request.user) else Student.objects.count(),
        'no_feedback_count': get_teacher_students_results_queryset(request.user).filter(feedback__isnull=True).count() if isUserTeacher(request.user) else Result.objects.filter(feedback__isnull=True).count(),
        'last_config_form': AcademicConfigForm(instance=last_academic_config)
    })
    return render(request, 'dashboard/index.html', context)


@login_required
@user_admin_or_teacher_required
def dashboard_profile(request):
    return render(request, 'dashboard/profile.html', get_context(request, segment='dashboard:profile',),)


def calculate_folder_size(folder_path):
    total_size = 0
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            total_size += default_storage.size(file_path)
    return total_size


@login_required
@user_admin_required
def dashboard_storage(request):
    media_root = settings.MEDIA_ROOT
    relative_path = request.GET.get('path', '')
    absolute_path = default_storage.path(relative_path)
    if not str(absolute_path).startswith(str(media_root)):
        raise Http404("Invalid path")
    context = {}
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['file']
            file_path = os.path.join(absolute_path, uploaded_file.name)
            default_storage.save(file_path, uploaded_file)
            return redirect(request.META.get('HTTP_REFERER'))
    else:
        form = UploadFileForm()
    media_list = []
    if default_storage.exists(absolute_path):
        fold_and_files = default_storage.listdir(absolute_path)
        for item in fold_and_files[0]:
            item_path = os.path.join(absolute_path, item)
            folder_size = calculate_folder_size(item_path)
            media_list.append({
                'name': item,
                'path': os.path.relpath(item_path, media_root),
                'type': 'Folder',
                'size': folder_size,
            })
        for item in fold_and_files[1]:
            item_path = os.path.join(absolute_path, item)
            folder_size = default_storage.size(item_path)
            media_list.append({
                'name': item,
                'path': os.path.relpath(item_path, media_root),
                'type': 'File',
                'size': folder_size,
            })
    context = get_context(request, context=context,
                          segment='dashboard:storage')
    context.update({
        "media_list": media_list,
        "form":  form,
        "current_path": relative_path,
    })
    return render(request, "dashboard/storage.html", context)


@login_required
@user_admin_required
def storage_delete(request):
    if request.method == "POST":
        file_path = request.GET.get("path", "")
        absolute_path = default_storage.path(file_path)
        if str(absolute_path).startswith(str(settings.MEDIA_ROOT)):
            try:
                default_storage.delete(absolute_path)
            except Exception as e:
                print(e)
                messages.error(request, 'Deleted succesfully.')
            return redirect(request.META.get('HTTP_REFERER'))
    return JsonResponse({"deleted": False})


def dashboard_login(request):
    form = LoginForm(request.POST or None)
    msg = None
    if request.method == "POST":
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse('dashboard:index'))
            else:
                msg = 'Invalid credentials'
        else:
            msg = 'Error validating the form'
    return render(request, "dashboard/accounts/login.html", {"form": form, "msg": msg})
