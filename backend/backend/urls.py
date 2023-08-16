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
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('chats.urls')),
    path('', include('accounts_face_recognition.urls')),
    path('', include('articles.urls')),
    path('', include('exams.urls')),
    path('', include('results.urls')),
    path('', include('students.urls')),
    path('', include('certificates.urls')),
    path('s/', include('dashboard.urls')),
    path('', include('stats_export.urls')),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

    urlpatterns += [
        # Serve files from the "models" folder as a static endpoint
        re_path(r'^models/(?P<path>.*)$', serve, {
            'document_root': settings.FACE_DETECT_MODEL_ROOT,
        }),
        re_path(r'^(?!static|media).*',  include('spa_app.urls')),
    ]
