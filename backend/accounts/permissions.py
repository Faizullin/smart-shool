from rest_framework import permissions
from students.models import Student


def isUserAdmin(user):
    return user.group_name == "admin"


def isUserTeacher(user):
    return user.group_name == "teacher"


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='admin').exists()
        return isUserAdmin(request.user)


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return isUserTeacher(request.user)


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view,):
        query = request.user.groups.filter(name='student')
        if query.exists():
            request.user.group_name = "student"
            request.student = Student.objects.get(user=request.user)
            return True
        return False