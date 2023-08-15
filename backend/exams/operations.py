from .models import StudentAnswer
from results.models import Result


def save_student_answer_result_score(student_answer: StudentAnswer):
    quiz = student_answer.question.quiz
    exam = quiz.exam
    student = student_answer.student
    result = Result.objects.get(student=student, exam=exam)
    quiz_questions = quiz.questions.all()
    total_questions_count = quiz.questions_count
    total_score_count = 0
    user_answers = StudentAnswer.objects.filter(
        question__in=quiz_questions, student=student)
    print("OLD", result.theory_marks, ' for ', student_answer.score, ' + ',
          [user_answer for user_answer in user_answers if user_answer.pk != student_answer.pk])
    total_score_count = sum([(0 if user_answer.score is None else user_answer.score)
                            for user_answer in user_answers if user_answer.pk != student_answer.pk])
    total_score_count += student_answer.score
    result.theory_marks = (total_score_count / total_questions_count) * 100
    print("New", result.theory_marks)
    result.save()
