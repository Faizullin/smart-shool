from django.http import HttpResponseForbidden
from django.contrib.auth.mixins import LoginRequiredMixin


class UserAdminOrTeacherRequiredMixin:
    allowed_groups = ['teacher', 'admin']

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(
            name__in=self.allowed_groups)
        if user_groups_queryset.exists():
            request.user.group_name = user_groups_queryset[0].name
            return super().dispatch(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")


class UserAdminRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(
            name="admin")
        if user_groups_queryset.exists():
            request.user.group_name = "admin"
            return super().dispatch(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")


class UserTeacherRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(
            name="teacher")
        if user_groups_queryset.exists():
            request.user.group_name = "teacher"
            return super().dispatch(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")
