from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from students.models import Student
from accounts.permissions import isUserTeacher

from .tables import StudentTable, StudentFilter
from dashboard.models import get_teacher_students_queryset


class StudentListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Student
    table_class = StudentTable
    template_name = 'dashboard/tables/my_students/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = StudentFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:my_student_list')
        context.update({
            'filterset': StudentFilter(self.request.GET, queryset=self.get_queryset(), request=self.request)
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return get_teacher_students_queryset(self.request.user)
