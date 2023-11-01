from django.urls import path, include
import json

app_name = 'dashboard'


urlpatterns = [
]

with open('dashboard/json/urls.json', 'r') as f:
    data = json.loads(f.read())
    for value in data:
        urlpatterns.append(path((value['url']), include(value['file'])))

# @login_required
# @user_admin_or_teacher_required
# def dashboard_index(request):
#     last_academic_config = AcademicConfig.objects.last()
#     context = get_context(request, segment='dashboard:index')
#     context.update({
#         'unchecked_results_count': get_teacher_students_results_queryset(request.user).count() if isUserTeacher(request.user) else Result.objects.filter(checked=False).count(),
#         'students_count': get_teacher_students_queryset(request.user).count() if isUserTeacher(request.user) else Student.objects.count(),
#         'no_feedback_count': get_teacher_students_results_queryset(request.user).filter(feedback__isnull=True).count() if isUserTeacher(request.user) else Result.objects.filter(feedback__isnull=True).count(),
#         'last_config_form': AcademicConfigForm(instance=last_academic_config)
#     })
#     return render(request, 'dashboard/index.html', context)
