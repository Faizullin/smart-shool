from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from students.models import Student
from academics.models import Subject, SubjectGroup, AcademicSession
from accounts.models import User, Group

from dashboard.models import get_students_with_initial_test


@login_required
def assign_subject_groups(request):
    context = get_context(segment='dashboard:assign_subject_groups_list')
    tmp_data = get_students_with_initial_test()
    data = {}
    for key in tmp_data.keys():
        data[Subject.objects.get(id=key).title] = tmp_data[key]
    context['data'] = data
    return render(request, 'dashboard/tables/assign_subject_groups/index.html', context=context)


@login_required()
def assign_subject_groups_save(request):
    data = get_students_with_initial_test()
    group = Group.objects.get(name='teacher')
    new_teacher = User.objects.filter(groups=group).first()

    for subject_id, item in data.items():

        for item_key in range(len(item)):
            subject_group = SubjectGroup.objects.create(
                semester=AcademicSession.objects.last(),
                subject_id=subject_id,
                teacher=new_teacher,
            )
            print("Iter", item, 'for', subject_id, subject_group.title)
            subject_group.title = subject_group.title + ' ' + ('high' if item_key == 0 else 'low')
            subject_group.save()
            for student in item[item_key]:
                student.current_group = subject_group
                student.save()
    return redirect(reverse('dashboard:subjectgroup_list'))
