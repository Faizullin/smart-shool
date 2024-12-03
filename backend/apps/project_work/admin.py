from django.contrib import admin

from .models import ProjectDevice, ProjectDeviceSensorData, PracticalWork, ProjectDeviceLabel, \
    ProjectDeviceSensorDataSubmit, ProjectDeviceApiKey

admin.site.register(ProjectDevice, )
admin.site.register(ProjectDeviceSensorData, )
admin.site.register(ProjectDeviceLabel, )
admin.site.register(PracticalWork, )
admin.site.register(ProjectDeviceSensorDataSubmit, )
admin.site.register(ProjectDeviceApiKey, )
