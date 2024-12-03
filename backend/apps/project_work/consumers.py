from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from utils.consumers import (AsyncBaseDataConsumer, AsyncBaseDataUserConsumer,
                             ErrorCode, ErrorMessage, UserChatInterface)
from .models import (ProjectDevice, ProjectDeviceSensorData, ProjectDeviceSensorDataSubmit)
from .serializers import (ProjectDeviceConsumerConnectSerializer,
                          ProjectDeviceSensorDataConsumerSubmitSerializer,
                          serializers)
from ..accounts.groups import StudentGroup, AdminGroup, TeacherGroup

UserModel = get_user_model()


def get_chat_device_room_name(chat_room) -> str:
    return 'chat_device_%s' % chat_room


def get_chat_user_room_name(chat_room) -> str:
    return 'chat_user_%s' % chat_room


class ProjectWorkUserDataConsumer(AsyncBaseDataUserConsumer):
    def get_group_room_name(self):
        return get_chat_user_room_name(self.room_id)

    @database_sync_to_async
    def check_permissions(self, room_id, user: UserModel):
        try:
            device = ProjectDevice.objects.select_related(
                'practical_work').get(id=room_id)
            if not device.activated:
                return False, {
                    "code": ErrorCode.PERMISSION_DENIED,
                    "reason": "Device is not activated. Activate it."
                }
            loaded_group_ids = user.groups.values_list('id', flat=True)
            if StudentGroup.id in loaded_group_ids:
                if device.practical_work.student == user.student:
                    return True, None
            elif AdminGroup.id in loaded_group_ids or TeacherGroup.id in loaded_group_ids:
                return True, None
            return False, {
                "code": ErrorCode.PERMISSION_DENIED,
                "reason": ErrorMessage.PERMISSION_DENIED,
            }
        except ProjectDevice.DoesNotExist:
            return False, {
                "code": ErrorCode.NOT_FOUND,
                "reason": ErrorMessage.NOT_FOUND,
            }

    async def handle_event(self, event_type, received_data):
        current_user_data = UserChatInterface(self.scope['user'])
        if event_type == 'send_command':
            to = received_data['data'].get('to', None)
            if to is None:
                await self.close(code=ErrorCode.INVALID_ARGUMENT, reason=ErrorMessage.INVALID_ARGUMENT)
                return
            elif to == 'device':
                await self.channel_layer.group_send(
                    get_chat_device_room_name(self.room_id),
                    {
                        "type": "send_command",
                        "data": {
                            "from": current_user_data.to_json(),
                            "data": received_data['data'],
                        }
                    },
                )
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "send_command",
                        "data": {
                            "from": current_user_data.to_json(),
                            "data": received_data["data"],
                        },
                    },
                )
                return
            else:
                await self.close(code=ErrorCode.INVALID_ARGUMENT, reason=ErrorMessage.INVALID_ARGUMENT)
                return

    async def send_command(self, event):
        await self.send_event(event['type'], event['data'])

    async def new_submit(self, event):
        await self.send_event(event['type'], event['data'], use_from=False, use_users_connected=False)


class ProjectWorkDeviceDataConsumer(AsyncBaseDataConsumer):
    def get_group_room_name(self):
        return get_chat_device_room_name(self.room_id)

    async def connect(self):
        room_id = self.scope['url_route']['kwargs']['room_name']
        args = self.scope["args"]
        self.room_id = room_id
        self.room_group_name = self.get_group_room_name()
        await self.accept()
        res = await self.check_device_permission(room_id, args)
        if not res[0]:
            await self.close(**res[1])
            return
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

    @database_sync_to_async
    def check_device_permission(self, device_id, args, use_password_check=True):
        password = args.get('password', None)
        if not password:
            return False, {
                "code": ErrorCode.INVALID_ARGUMENT,
                "reason": "Password required"
            }
        try:
            device = ProjectDevice.objects.get(id=device_id)
            if not device.activated:
                return False, {
                    "code": ErrorCode.PERMISSION_DENIED,
                    "reason": "Device is not activated. Activate it."
                }
            if use_password_check:
                serializer = ProjectDeviceConsumerConnectSerializer(data={
                    'password': password[0],
                })
                serializer.is_valid(raise_exception=True)
                password = serializer.validated_data.pop('password')
                if not check_password(password, device.password):
                    return False, {
                        "code": ErrorCode.PERMISSION_DENIED,
                        "reason": "Password does not match.",
                    }
            return True, None
        except serializers.ValidationError as err:
            return False, {
                "code": ErrorCode.INVALID_ARGUMENT,
                "reason": err.detail,
            }
        except ProjectDevice.DoesNotExist:
            return False, {
                "code": ErrorCode.NOT_FOUND,
                "reason": ErrorMessage.NOT_FOUND,
            }
        except Exception as err:
            return False, {
                "code": ErrorCode.SERVER_ERROR,
                "reason": str(err),
            }

    @database_sync_to_async
    def check_and_add_new_data(self, device_id, data):
        try:
            device = ProjectDevice.objects.get(id=device_id)
            if not device.activated:
                return False, {
                    "code": ErrorCode.PERMISSION_DENIED,
                    "reason": "Device is not activated. Activate it."
                }
            serializer = ProjectDeviceSensorDataConsumerSubmitSerializer(
                data=data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            sensors_validated_data_list = validated_data.pop(
                'sensor_data_list', [])
            sensor_data_labels = device.sensor_data_labels.all()
            sensor_data_labels_str_list = [i.field for i in sensor_data_labels]
            for item in sensors_validated_data_list:
                if not item['field'] in sensor_data_labels_str_list:
                    return False, {
                        "code": ErrorCode.INVALID_ARGUMENT,
                        "reason": f"{item['field']} key error."
                    }
            submit = ProjectDeviceSensorDataSubmit.objects.create(
                device=device)
            for item in sensors_validated_data_list:
                for j in sensor_data_labels:
                    if j.field == item['field']:
                        ProjectDeviceSensorData.objects.create(
                            submit=submit, value=item['value'], label=j)
            return True, ProjectDeviceSensorDataConsumerSubmitSerializer(submit).data
        except serializers.ValidationError as err:
            return False, {
                "code": ErrorCode.INVALID_ARGUMENT,
                "reason": err.detail,
            }
        except ProjectDevice.DoesNotExist:
            return False, {
                "code": ErrorCode.NOT_FOUND,
                "reason": ErrorMessage.NOT_FOUND,
            }
        except Exception as err:
            return False, {
                "code": ErrorCode.SERVER_ERROR,
                "reason": str(err),
            }

    async def handle_event(self, event_type, received_data):
        if event_type == 'new_submit':
            res = await self.check_and_add_new_data(self.room_id, received_data['data'])
            if not res[0]:
                await self.close(**res[1])
                return
            await self.channel_layer.group_send(
                get_chat_user_room_name(self.room_id),
                {
                    "type": "new_submit",
                    "data": {
                        "data": res[1],
                    },
                },
            )

    async def send_command(self, event):
        await self.send_event(event['type'], event['data'], use_from=False)
