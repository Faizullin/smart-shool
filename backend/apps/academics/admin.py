from django.contrib import admin
from .models import AcademicSession, Subject, SubjectGroup, AcademicConfig

# Register your models here.
admin.site.register(AcademicSession, )
admin.site.register(Subject, )
admin.site.register(SubjectGroup, )
admin.site.register(AcademicConfig, )
