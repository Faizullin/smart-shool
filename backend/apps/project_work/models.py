from django.db import models
from rest_framework_api_key.models import AbstractAPIKey

from apps.exams.models import Exam
from apps.file_system.models import File as FileModel
from apps.students.models import Student
from utils.models import AbstractTimestampedModel


class PracticalWork(AbstractTimestampedModel):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('dev', 'Development'),
        ('rated', 'Rated'),
    )
    student = models.ForeignKey(
        Student, on_delete=models.SET_NULL, null=True, related_name='project_works')
    title = models.CharField(max_length=100)
    files = models.ManyToManyField(FileModel, related_name='projects')
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='dev')
    submit_exam = models.ForeignKey(
        Exam, null=True, blank=True, on_delete=models.SET_NULL)
    shared_students = models.ManyToManyField(Student)


class ProjectDevice(AbstractTimestampedModel):
    title = models.CharField(max_length=100)
    script = models.OneToOneField(
        FileModel, null=False, blank=False, on_delete=models.CASCADE, related_name='device')
    practical_work = models.OneToOneField(
        PracticalWork, null=False, blank=False, on_delete=models.CASCADE, related_name='device')
    activated = models.BooleanField(default=False)
    activated_at = models.DateTimeField(null=True)


class ProjectDeviceApiKey(AbstractTimestampedModel, AbstractAPIKey):
    device = models.OneToOneField(
        ProjectDevice,
        on_delete=models.CASCADE,
        related_name="api_key"
    )


class ProjectDeviceLabel(AbstractTimestampedModel):
    label = models.CharField(max_length=100, null=False)
    field = models.CharField(max_length=100, null=False)
    device = models.ForeignKey(
        ProjectDevice, null=False, blank=False, on_delete=models.CASCADE, related_name='sensor_data_labels')


class ProjectDeviceSensorDataSubmit(AbstractTimestampedModel):
    device = models.ForeignKey(
        ProjectDevice, null=False, blank=False, on_delete=models.CASCADE, related_name='submits')


class ProjectDeviceSensorData(AbstractTimestampedModel):
    submit = models.ForeignKey(
        ProjectDeviceSensorDataSubmit, null=False, blank=False, on_delete=models.CASCADE,
        related_name='sensor_data_list')
    label = models.ForeignKey(
        ProjectDeviceLabel, null=False, blank=False, on_delete=models.CASCADE)
    value = models.FloatField(null=False)
