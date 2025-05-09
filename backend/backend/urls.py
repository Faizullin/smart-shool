"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.shortcuts import render, redirect
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.accounts.urls')),
    path('', include('apps.file_system.urls')),
    path('', include('apps.articles.urls')),
    path('', include('apps.exams.urls')),
    path('', include('apps.results.urls')),
    path('', include('apps.students.urls')),
    path('', include('apps.certificates.urls')),
    path('', include('apps.admin_dashboard.urls')),
    path('', include('apps.dashboard.urls')),
    path('', include('apps.project_work.urls')),
    path('', include('apps.notification_system.urls')),
    path('', include('apps.conferences.urls')),
    path('', include('apps.chats.urls')),
    path('', include('apps.accounts_face_recognition.urls')),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    from debug_toolbar.toolbar import debug_toolbar_urls

    urlpatterns = [
                      *urlpatterns,
                  ] + debug_toolbar_urls()
