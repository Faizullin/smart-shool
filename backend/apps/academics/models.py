from django.contrib.auth import get_user_model
from django.db import models

from utils.models import AbstractTimestampedModel

User = get_user_model()


class AcademicSession(AbstractTimestampedModel):
    days = models.PositiveIntegerField(null=True)

    def __str__(self):
        return '{} | {} days'.format(self.pk, self.days)


class Subject(AbstractTimestampedModel):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class SubjectGroup(AbstractTimestampedModel):
    title = models.CharField(
        'Subject Group Title',
        max_length=20,
    )
    semester = models.ForeignKey(
        AcademicSession,
        blank=True, null=True, on_delete=models.SET_NULL
    )
    subject = models.ForeignKey(
        Subject, blank=True, null=True, on_delete=models.SET_NULL, related_name='subject_groups')
    teacher = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL, related_name='subject_groups')

    def __str__(self):
        return f"{self.pk} | {self.title}(for {self.subject.title if self.subject else 'None'})"


class AcademicConfig(AbstractTimestampedModel):
    assign_groups_theory_min = models.PositiveIntegerField(
        'Pass Minimum theory marks',
        default=50,
    )
    email_enabled = models.BooleanField(default=False, null=False)
    project_work_device_requests_limit = models.PositiveIntegerField(
        default=100)


def get_current_academic_config() -> AcademicConfig:
    return AcademicConfig.objects.last()


def get_current_academic_session() -> AcademicSession:
    return AcademicSession.objects.last()
