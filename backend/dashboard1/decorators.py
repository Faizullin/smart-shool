from functools import wraps
from django.http import HttpResponseForbidden


def group_required(*group_names):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user
            if user.groups.filter(name__in=group_names).exists():
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponseForbidden("Access Denied")
        return _wrapped_view
    return decorator


def user_admin_or_teacher_required(view_func):
    allowed_groups = ['teacher', 'admin']

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(
            name__in=allowed_groups)
        if user_groups_queryset.exists():
            request.user.group_name = user_groups_queryset[0].name
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")
    return _wrapped_view


def user_admin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(name='admin')
        if user_groups_queryset.exists():
            request.user.group_name = 'admin'
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")
    return _wrapped_view


def user_teacher_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups_queryset = request.user.groups.filter(name='teacher')
        if user_groups_queryset.exists():
            request.user.group_name = 'teacher'
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Access Denied")
    return _wrapped_view
