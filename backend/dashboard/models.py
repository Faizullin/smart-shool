from django.db import models
from django.db.models import Sum
from academics.models import SubjectGroup, Subject
from exams.models import Exam, StudentAnswer
from students.models import Student
from results.models import Result, Feedback
from certificates.models import Certificate

# Create your models here.


def get_teacher_subject_groups_queryset(teacher):
    return SubjectGroup.objects.filter(teacher=teacher)


def get_teacher_exams_queryset(teacher):
    teacher_subject_groups_queryset = get_teacher_subject_groups_queryset(
        teacher=teacher)
    return Exam.objects.filter(subject_group__in=teacher_subject_groups_queryset)


def get_teacher_students_queryset(teacher):
    teacher_subject_groups_queryset = get_teacher_subject_groups_queryset(
        teacher=teacher)
    return Student.objects.filter(current_group__in=teacher_subject_groups_queryset)


def get_teacher_students_results_queryset(teacher):
    teacher_students_queryset = get_teacher_students_queryset(teacher=teacher)
    exams_queryset = get_teacher_exams_queryset(teacher=teacher)
    return Result.objects.filter(student__in=teacher_students_queryset, exam__in=exams_queryset)


def get_teacher_students_results_feedbacks_queryset(teacher):
    exams_queryset = get_teacher_exams_queryset(teacher=teacher)
    print(exams_queryset)
    return Feedback.objects.filter(exam__in=exams_queryset)


def student_has_initital_test(student: Student, exams_queryset) -> bool:
    # exams_queryset =
    # results_queryset = Result.objects.filter(exam__in=exams_queryset)
    return Result.objects.filter(student=student, exam__in=exams_queryset).exists()


def get_students_with_initial_test(exams_queryset=None):
    if not exams_queryset:
        exams_queryset = Exam.objects.filter(exam_type='i',)
    results_queryset = Result.objects.filter(exam__in=exams_queryset)

    students_queryset = Student.objects.filter(results__in=results_queryset)

    students_data = students_queryset.values(
        'id', 'results__id', 'results__theory_marks', 'results__subject__id')
    data = dict()
    for student_item in students_data:
        student = Student.objects.get(id=student_item['id'])
        student.initial_score = student_item['results__theory_marks']
        if student_item['results__subject__id'] in data:
            if student.initial_score > 50:
                data[student_item['results__subject__id']][0].append(student)
            else:
                data[student_item['results__subject__id']][1].append(student)
        else:
            data[student_item['results__subject__id']] = [[],[]]
            if student.initial_score > 50:
                data[student_item['results__subject__id']] = [[student],[]]
            else:
                data[student_item['results__subject__id']] = [[],[student]]
    return data


def get_teacher_certificates_queryset(teacher):
    teacher_students_queryset = get_teacher_students_queryset(teacher=teacher)
    return Certificate.objects.filter(student__in=teacher_students_queryset)

def save_student_answer_result_score(student_answer: StudentAnswer):
    quiz = student_answer.question.quiz
    exam = quiz.exam
    student = student_answer.student
    result = Result.objects.get(student=student, exam=exam)
    quiz_questions = quiz.questions.all()
    total_questions_count = quiz.questions_count
    total_score_count = 0
    user_answers = StudentAnswer.objects.filter(question__in = quiz_questions, student = student)
    print("OLD", result.theory_marks, ' for ',student_answer.score,' + ', [user_answer for user_answer in user_answers if user_answer.pk != student_answer.pk])
    total_score_count = sum([(0 if user_answer.score is None else user_answer.score ) for user_answer in user_answers if user_answer.pk != student_answer.pk])
    total_score_count += student_answer.score
    result.theory_marks = (total_score_count / total_questions_count) * 100
    print("New", result.theory_marks)
    result.save()