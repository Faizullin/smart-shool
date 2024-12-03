from django.contrib.auth import get_user_model
from django.db import models

from apps.project_work.models import PracticalWork
from utils.models import AbstractTimestampedModel

User = get_user_model()


class VideoConference(AbstractTimestampedModel):
    STATUS_CHOICES = (
        ('planned', 'Planned'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    admin = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='admin_conferences')
    users = models.ManyToManyField(User, related_name='conferences_attending')
    invited_users = models.ManyToManyField(
        User, related_name='conferences_invited', blank=True)
    planned_time = models.DateTimeField()
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='planned')
    project_work = models.OneToOneField(
        PracticalWork, null=True, blank=True, on_delete=models.SET_NULL, related_name='conference')

    def __str__(self):
        return self.title


# class VideoMessage(TimestampedModel):
#     conference = models.ForeignKey(
#         VideoConference, on_delete=models.CASCADE, related_name='video_messages')
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.CharField(max_length=255)
#     # message_url = models.URLField()

#     def __str__(self):
#         return f'{self.user.username} | {self.conference}'
