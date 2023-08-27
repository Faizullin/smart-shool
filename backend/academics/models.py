from django.db import models
from accounts.models import User

# Create your models here.


class AcademicSession(models.Model):
    days = models.PositiveIntegerField(null=True)

    def __str__(self):
        return '{} | {} days'.format(self.pk, self.days)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Subject(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SubjectGroup(models.Model):
    title = models.CharField(
        'Subject Group Title',
        max_length=20,
    )
    semester = models.ForeignKey(
        AcademicSession,
        blank=True, null=True, on_delete=models.SET_NULL
    )
    subject = models.ForeignKey(
        Subject, blank=True, null=True, on_delete=models.SET_NULL)
    teacher = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.pk} | {self.title}(for {self.subject.title if self.subject else 'None'})"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AcademicConfig(models.Model):
    assign_groups_theory_min = models.PositiveIntegerField(
        'Pass Minimum theory marks',
        default=50,
    )
    email_enabled = models.BooleanField(default=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def get_current_academic_config() -> AcademicConfig:
    return AcademicConfig.objects.last()
