from django.contrib.auth.models import AbstractUser
from django_softdelete.models import SoftDeleteModel, models

from utils.models import AbstractTimestampedModel


def user_directory_path(instance, filename):
    return 'uploads/profile-pictures/{0}/{1}'.format(instance.pk, filename)


class UserApprovalStatus(models.TextChoices):
    APPROVED = ('approved', 'Approved')
    REJECTED = ('rejected', 'Rejected')
    PENDING = ('pending', 'Pending')


class CustomUser(AbstractUser, AbstractTimestampedModel, SoftDeleteModel):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['username', 'email'],
    email = models.EmailField("email", unique=True, blank=True)
    approval_status = models.CharField(
        max_length=10,
        choices=UserApprovalStatus.choices,
        default=UserApprovalStatus.PENDING,
    )
