from django.http import HttpResponseForbidden
from django.contrib.auth.mixins import LoginRequiredMixin


class UserAdminOrTeacherRequiredMixin:
    allowed_groups = ['teacher', 'admin']

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.all()
        user_groups_name_list = [i.name for i in user_groups_queryset]
        request.user.group_names = user_groups_name_list
        for i in self.allowed_groups:
            if i in user_groups_name_list:
                return super().dispatch(request, *args, **kwargs)
        return HttpResponseForbidden("Access Denied")


class UserAdminRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.all()
        user_groups_name_list = [i.name for i in user_groups_queryset]
        request.user.group_names = user_groups_name_list
        if 'admin' in user_groups_name_list:
            return super().dispatch(request, *args, **kwargs)
        return HttpResponseForbidden("Access Denied")


class UserTeacherRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        user_groups_queryset = request.user.groups.all()
        user_groups_name_list = [i.name for i in user_groups_queryset]
        request.user.group_names = user_groups_name_list
        if 'teacher' in user_groups_name_list:
            return super().dispatch(request, *args, **kwargs)
        return HttpResponseForbidden("Access Denied")
