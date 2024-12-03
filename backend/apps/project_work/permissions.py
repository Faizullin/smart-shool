from rest_framework.permissions import BasePermission
from apps.accounts.permissions import get_loaded_group_names
from .models import PracticalWork, ProjectDevice


class IsProjectOwner(BasePermission):

    def has_object_permission(self, request, view, obj: PracticalWork):
        if request.user.is_authenticated:
            loaded_group_names = get_loaded_group_names(request.user)
            if 'student' in loaded_group_names:
                return obj.student == request.user.student
            elif 'admin' in loaded_group_names or 'teacher' in loaded_group_names:
                return True
        return False

class IsDeviceOwner(BasePermission):

    def has_object_permission(self, request, view, obj: ProjectDevice):
        if request.user.is_authenticated:
            loaded_group_names = get_loaded_group_names(request.user)
            if 'student' in loaded_group_names:
                return obj.practical_work.student == request.user.student
            elif 'admin' in loaded_group_names or 'teacher' in loaded_group_names:
                return True
        return False