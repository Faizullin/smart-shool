from django.urls import path
from .views import *

app_name = 'notification_system'

urlpatterns = [
    path('api/v1/notifications/',
         NotificationListView.as_view(),
         name='list'
         ),
    path('api/v1/notifications/<int:pk>/',
         NotificationDestroyView.as_view(),
         name='destroy'
         ),
     path('api/v1/notifications/<int:pk>/unread/',
         NotificationUnreadView.as_view(),
         name='unread'
         ),
]
