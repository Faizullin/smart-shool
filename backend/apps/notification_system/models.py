from django.contrib.auth.models import Group
from django.contrib.contenttypes.models import ContentType
from django.db.models import QuerySet
from django.utils import timezone
from notifications.base.models import AbstractNotification, EXTRA_DATA

from utils.models import AbstractTimestampedModel
from .signals import notify


class Notification(AbstractNotification, AbstractTimestampedModel):
    def naturalday(self):
        """
        Shortcut for the ``humanize``.
        Take a parameter humanize_type. This parameter control the which humanize method use.
        Return ``today``, ``yesterday`` ,``now``, ``2 seconds ago``etc. 
        """
        from django.contrib.humanize.templatetags.humanize import naturalday
        return naturalday(self.timestamp)

    def naturaltime(self):
        from django.contrib.humanize.templatetags.humanize import naturaltime
        return naturaltime(self.timestamp)


def notify_handler(verb, **kwargs):
    """
    Handler function to create Notification instance upon action signal call.
    """
    # Pull the options out of kwargs
    kwargs.pop('signal', None)
    recipient = kwargs.pop('recipient')
    actor = kwargs.pop('sender')
    optional_objs = [
        (kwargs.pop(opt, None), opt)
        for opt in ('target', 'action_object')
    ]
    public = bool(kwargs.pop('public', True))
    description = kwargs.pop('description', None)
    timestamp = kwargs.pop('timestamp', timezone.now())
    level = kwargs.pop('level', Notification.LEVELS.info)
    actor_for_concrete_model = kwargs.pop('actor_for_concrete_model', True)

    # Check if User or Group
    if isinstance(recipient, Group):
        recipients = recipient.user_set.all()
    elif isinstance(recipient, (QuerySet, list)):
        recipients = recipient
    else:
        recipients = [recipient]

    new_notifications = []

    for recipient in recipients:
        newnotify = Notification(
            recipient=recipient,
            actor_content_type=ContentType.objects.get_for_model(actor, for_concrete_model=actor_for_concrete_model),
            actor_object_id=actor.pk,
            verb=str(verb),
            public=public,
            description=description,
            timestamp=timestamp,
            level=level,
        )

        # Set optional objects
        for obj, opt in optional_objs:
            if obj is not None:
                for_concrete_model = kwargs.pop(f'{opt}_for_concrete_model', True)
                setattr(newnotify, '%s_object_id' % opt, obj.pk)
                setattr(newnotify, '%s_content_type' % opt,
                        ContentType.objects.get_for_model(obj, for_concrete_model=for_concrete_model))

        if kwargs and EXTRA_DATA:
            # set kwargs as model column if available
            for key in list(kwargs.keys()):
                if hasattr(newnotify, key):
                    setattr(newnotify, key, kwargs.pop(key))
            newnotify.data = kwargs

        newnotify.save()
        new_notifications.append(newnotify)

    return new_notifications


# connect the signal

notify.connect(notify_handler, dispatch_uid='notification_system.models.Notification')
