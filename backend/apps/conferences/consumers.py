from channels.db import database_sync_to_async
from django.utils import timezone

from utils.consumers import (AsyncBaseDataUserConsumer, ErrorCode,
                             ErrorMessage, UserChatInterface)
from .models import VideoConference


def get_chat_conference_room_name(chat_room) -> str:
    return 'chat_conference_%s' % chat_room


class VideoConferenceUserConsumer(AsyncBaseDataUserConsumer):
    def get_group_room_name(self):
        return get_chat_conference_room_name(self.room_id)

    async def connect(self):
        if await super().connect():
            await self.update_conference_state(started_at_update=True)

    @database_sync_to_async
    def check_permissions(self, room_id, user):
        try:
            conference = VideoConference.objects.select_related(
                'admin').get(id=room_id)
            if conference.status == 'planned':
                if conference.admin != user:
                    return False, {
                        "code": ErrorCode.PERMISSION_DENIED,
                        "reason": ErrorMessage.PERMISSION_DENIED,
                    }
            elif conference.status == 'completed':
                return False, {
                    "code": ErrorCode.PERMISSION_DENIED,
                    "reason": "Conference is completed.",
                }
            if not (user in conference.users.all()):
                return False, {
                    "code": ErrorCode.PERMISSION_DENIED,
                    "reason": ErrorMessage.PERMISSION_DENIED,
                }
            return True, None
        except VideoConference.DoesNotExist:
            return False, {
                "code": ErrorCode.NOT_FOUND,
                "reason": ErrorMessage.NOT_FOUND,
            }

    @database_sync_to_async
    def update_conference_state(self, started_at_update=False, ended_at_update=False, ended_at_duration_update=False):
        conference = VideoConference.objects.get(id=self.room_id)
        if started_at_update and ((not conference.started_at) or conference.status == 'planned'):
            conference.started_at = timezone.now()
            conference.status = 'ongoing'
            conference.save()
        if ended_at_update and conference.status != 'completed':
            conference.ended_at = timezone.now()
            conference.status = 'completed'
            conference.save()
        if ended_at_duration_update and conference.status == 'ongoing':
            now_time = timezone.now()
            end_bound_time = conference.started_at + \
                             timezone.timedelta(minutes=20)
            if end_bound_time < now_time:
                conference.status = 'completed'
                conference.ended_at = now_time
                conference.save()

    async def handle_event(self, event_type, received_data):
        current_user_data = UserChatInterface(self.scope['user'])
        if event_type == "sending_offer":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "sending_offer",
                    "data": {
                        "data": received_data['data'],
                        "from": current_user_data.to_json(),
                    },
                },
            )
            return
        elif event_type == "sending_answer":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "sending_answer",
                    "data": {
                        "data": received_data['data'],
                        "from": current_user_data.to_json(),
                    },
                },
            )
            return
        elif event_type == "chat_message_new":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message_new",
                    "data": {
                        "data": received_data['data'],
                        "from": current_user_data.to_json(),
                    },
                },
            )
            return
        elif event_type == "meeting_stop":
            await self.update_conference_state(ended_at_update=True)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "meeting_stop",
                    "data": {
                        "data": received_data['data'],
                        "from": current_user_data.to_json(),
                    },
                },
            )
            return

    async def meeting_stop(self, event):
        await self.send_event(event['type'], event['data'])
    async def sending_offer(self, event):
        await self.send_event(event['type'], event['data'])

    async def sending_answer(self, event):
        await self.send_event(event['type'], event['data'])

    async def chat_message_new(self, event):
        await self.send_event(event['type'], event['data'])
