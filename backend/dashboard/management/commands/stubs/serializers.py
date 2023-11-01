from rest_framework import serializers
from dashboard.models import {ModelName}
from utils.serializers import TimestampedSerializer


class {ModelName}Serializer(TimestampedSerializer):
    class Meta:
        model = {ModelName}
        fields = ('id', 'created_at', 'updated_at')
