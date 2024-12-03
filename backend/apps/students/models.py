from django.contrib.auth import get_user_model
from django.db import models

from apps.academics.models import SubjectGroup
from utils.models import AbstractTimestampedModel

User = get_user_model()


class Student(AbstractTimestampedModel):
    STATUS_CHOICES = [("active", "Active"), ("inactive", "Inactive")]

    current_status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="active"
    )
    current_group = models.ForeignKey(
        SubjectGroup, on_delete=models.SET_NULL, blank=True, null=True
    )

    user = models.OneToOneField(
        User, null=False, on_delete=models.CASCADE, related_name='student', unique=True)


    class Meta:
        ordering = ["id", "created_at", "updated_at"]

    def __str__(self):
        return f"{self.id} | {self.user})"
