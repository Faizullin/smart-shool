from apps.results.models import Result


def re_calculate_result(result: Result, save=False):
    student_answers = result.student_answers.all()
    total_questions_count = result.exam.quiz.questions.count()
    total_correct_answers = 0
    for i in student_answers:
        total_correct_answers += i.score
    score_percent = (total_correct_answers /
                     total_questions_count) * 100
    result.theory_score = score_percent
    if save:
        result.save()
    return result
