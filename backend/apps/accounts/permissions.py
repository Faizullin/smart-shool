from rest_framework import permissions

from apps.accounts.groups import StaffGroup, DeveloperGroup, AdminGroup, TeacherGroup, StudentGroup


def get_loaded_group_names(user):
    return user.groups.values_list('name', flat=True)


class CBasePermission(permissions.BasePermission):
    def get_groups_ids(self, request) -> list:
        groups = request.user.groups.all()
        return [item.id for item in groups]


class IsStaff(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return StaffGroup.id in groups_ids


class IsDeveloper(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return DeveloperGroup.id in groups_ids


class IsAdmin(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return AdminGroup.id in groups_ids


class IsAdminOrStaffOrDeveloper(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return (StaffGroup.id in groups_ids) or (DeveloperGroup.id in groups_ids) or (AdminGroup.id in groups_ids)


class IsTeacherOrAdmin(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return (TeacherGroup.id in groups_ids) or (AdminGroup.id in groups_ids)


class IsTeacher(CBasePermission):
    def has_permission(self, request, view):
        groups_ids = self.get_groups_ids(request)
        return TeacherGroup.id in groups_ids


class IsStudent(CBasePermission):
    def has_permission(self, request, view, ):
        groups_ids = self.get_groups_ids(request)
        return StudentGroup.id in groups_ids
