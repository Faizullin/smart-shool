from django.dispatch import receiver
from django.db.models.signals import post_delete
from django.core.validators import RegexValidator
from django.db import models
from django.urls import reverse
from django.utils import timezone

from academics.models import Subject, SubjectGroup
from accounts.models import User


class Student(models.Model):
    STATUS_CHOICES = [("active", "Active"), ("inactive", "Inactive")]

    GENDER_CHOICES = [("male", "Male"), ("female", "Female")]

    current_status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="active"
    )
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200, blank=True)
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICES, default="male")
    date_of_birth = models.DateField(default=timezone.now)

    current_group = models.ForeignKey(
        SubjectGroup, on_delete=models.SET_NULL, blank=True, null=True
    )

    date_of_admission = models.DateField(default=timezone.now)

    mobile_num_regex = RegexValidator(
        regex="^[0-9]{10,15}$", message="Entered mobile number isn't in a right format!"
    )
    parent_mobile_number = models.CharField(
        validators=[mobile_num_regex], max_length=13, blank=True
    )
    address = models.TextField(blank=True)
    others = models.TextField(blank=True)

    user = models.OneToOneField(
        User, null=False, on_delete=models.CASCADE, related_name='student', unique=True)

    class Meta:
        ordering = ["id", "first_name", "created_at", "updated_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.user})"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
