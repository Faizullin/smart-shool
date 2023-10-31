from django.db import models
from django.db.models import Sum
from academics.models import SubjectGroup, Subject, get_current_academic_config
from exams.models import Exam, Practical
from students.models import Student
from results.models import Result, Feedback
from certificates.models import Certificate
# Create your models here.


def get_teacher_subject_groups_queryset(teacher):
    return SubjectGroup.objects.filter(teacher=teacher)


def get_teacher_subjects_queryset(teacher):
    teacher_subject_groups_queryset = get_teacher_subject_groups_queryset(
        teacher=teacher)
    return Subject.objects.filter(id__in=teacher_subject_groups_queryset.values('subject_id'))


def get_teacher_exams_queryset(teacher):
    teacher_subjects_queryset = get_teacher_subjects_queryset(
        teacher=teacher)
    return Exam.objects.filter(subject__in=teacher_subjects_queryset,)


def get_teacher_students_queryset(teacher):
    teacher_subject_groups_queryset = get_teacher_subject_groups_queryset(
        teacher=teacher)
    return Student.objects.filter(current_group__in=teacher_subject_groups_queryset)


def get_teacher_students_results_queryset(teacher):
    teacher_students_queryset = get_teacher_students_queryset(teacher=teacher)
    exams_queryset = get_teacher_exams_queryset(teacher=teacher)
    return Result.objects.filter(student__in=teacher_students_queryset, exam__in=exams_queryset)


def get_teacher_students_results_feedbacks_queryset(teacher):
    results_queryset = get_teacher_students_results_queryset(teacher=teacher)
    return Feedback.objects.filter(result__in=results_queryset)


def student_has_initital_test(student: Student, exams_queryset) -> bool:
    return Result.objects.filter(result__student=student, exam__in=exams_queryset).exists()


def get_students_with_initial_test(exams_queryset=None):
    current_academic_config = get_current_academic_config()
    if not exams_queryset:
        exams_queryset = Exam.objects.filter(exam_type='i',)
    results_queryset = Result.objects.filter(exam__in=exams_queryset)
    students_queryset = Student.objects.filter(
        results__in=results_queryset, current_group=None)

    students_data = students_queryset.values(
        'id', 'results__id', 'results__total_marks', 'results__exam__subject__id')
    data = dict()
    for student_item in students_data:
        student = Student.objects.get(id=student_item['id'])
        student.initial_score = student_item['results__total_marks']
        results__exam__subject__id = student_item['results__exam__subject__id']
        if student_item['results__exam__subject__id'] in data:
            if student.initial_score > current_academic_config.assign_groups_theory_min:
                data[results__exam__subject__id][0].append(student)
            else:
                data[results__exam__subject__id][1].append(student)
        else:
            data[results__exam__subject__id] = [[], []]
            if student.initial_score > current_academic_config.assign_groups_theory_min:
                data[results__exam__subject__id] = [[student], []]
            else:
                data[results__exam__subject__id] = [[], [student]]
    return data


def get_teacher_certificates_queryset(teacher):
    teacher_subjects_queryset = get_teacher_subjects_queryset(
        teacher=teacher)
    return Certificate.objects.filter(subject__in=teacher_subjects_queryset)


def get_teacher_students_practicals_queryset(teacher):
    teacher_students_queryset = get_teacher_students_queryset(teacher=teacher)
    exams_queryset = get_teacher_exams_queryset(teacher=teacher)
    return Practical.objects.filter(student__in=teacher_students_queryset, exam__in=exams_queryset)