from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'project_work'

device_router = DefaultRouter()
device_router.register(r'',  ProjectDeviceView,)

urlpatterns = [
    path('api/v1/projects/my/', PracticalWorkListMyView.as_view(), name='list-my'),
    path('api/v1/projects/submit/', PracticalWorkSubmitView.as_view(), name='submit'),
    #     path('api/projects/<int:pk>/share/',
    #          PracticalWorkShareView.as_view(), name='share'),
    path('api/v1/projects/<int:pk>/',
         PracticalWorkRetrieveView.as_view(), name='retrieve'),
    path('api/v1/projects/<int:project_work_id>/files/',
         PracticalWorkFileUploadView.as_view()),
    path('api/v1/projects/<int:project_work_id>/files/<int:pk>/',
         PracticalWorkFileDeleteView.as_view()),
    path('api/v1/projects/<int:project_work_id>/code/',
         PracticalWorkFileCodeCreateView.as_view()),
    path('api/v1/projects/<int:project_work_id>/code/<int:pk>/',
         PracticalWorkFileCodeRetrieveUpdateDestroyView.as_view()),
    path('api/v1/projects/device/<int:pk>/stream/',
         ProjectDeviceStreamView.as_view(), name='sensor-data-stream'),
#     path('api/projects/<int:pk>/files/<int:file_pk>/check/',
#          PracticalWorkDocFileCheckView.as_view()),
    path("api/v1/projects/device/<int:device_id>/generate-key/", ProjectDeviceGenerateApiKeyView.as_view(), name="device-generate-key"),
    path('api/v1/projects/device/', include(device_router.urls)),
]
