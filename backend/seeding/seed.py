import random
from faker import Faker
from django.utils import timezone
from .factories import *


def seed():
    fake = Faker()
    random.seed(42)  # Set a seed for consistent data generation

    academic_config = AcademicConfig.objects.create(
        email_enabled=False,
    )
    last_academic_session = AcademicSession.objects.create(
        days=100,
    )
    groupAdmin = GroupFactory(
        name="admin"
    )
    groupTeacher = GroupFactory(
        name="teacher"
    )
    groupStudent = GroupFactory(
        name="student"
    )
    superuser1 = SuperuserFactory(
        username="admin",
        email="admin@example.com",
        password="password",
    )
    teacher1 = UserFactory(
        approval_status=random.choice(["a"]),
        email="teacher@example.com",
        username="teacher",
        password="password",
    )
    teacher2 = UserFactory(
        approval_status=random.choice(["a"]),
        email="teacher2@example.com",
        username="teacher2",
        password="password",
    )

    superuser1.groups.set([groupAdmin])
    superuser1.save()
    teacher1.groups.set([groupTeacher])
    teacher1.save()
    teacher2.groups.set([groupTeacher])
    teacher2.save()

    SubjectFactory(
        title='math',
    )
    SubjectFactory(
        title='physics',
    )
    last_subject = SubjectFactory(
        title='IoT',
    )

    subject_group = SubjectGroupFactory(
        semester=last_academic_session,
        subject=last_subject,
        teacher=teacher1,
    )

    student_users = []
    for _ in range(3):
        user = UserFactory(
            approval_status=random.choice(["n", "p", "d", "a"]),
            email=fake.email(),
            username=fake.user_name(),
            password="password",
        )
        student_users.append(user)

    def add_exam(exam_type, subject: Subject):
        last_exam = ExamFactory.create(
            exam_type=exam_type,
            subject=subject
        )
        last_exam_quiz = QuizFactory.create(
            exam=last_exam
        )
        question1 = Question.objects.create(
            quiz=last_exam_quiz, type='c', prompt="2+2")
        Answer.objects.create(question=question1, content="2+2", correct=True)
        Answer.objects.create(question=question1, content="2+1", correct=False)
        question2 = Question.objects.create(
            quiz=last_exam_quiz, type='o', prompt="Capital of Kazakhstan")
        Answer.objects.create(question=question2,
                              content="astana", correct=True)
        Answer.objects.create(question=question2,
                              content="Astana", correct=True)
        source_question1 = Question.objects.create(
            quiz=last_exam_quiz, type='d', prompt="Connect questions")
        question3 = DraggableSubQuestion.objects.create(
            source_question=source_question1, prompt="=111*5")
        question3.correct_answers.set(
            [Answer.objects.create(question=source_question1, content="555")])
        question4 = DraggableSubQuestion.objects.create(
            source_question=source_question1, prompt="=111*4")
        question4.correct_answers.set(
            [Answer.objects.create(question=source_question1, content="444")])
    add_exam('i', last_subject)
    add_exam('m', last_subject)
    add_exam('f', last_subject)

    for user in student_users:
        StudentFactory(
            current_status=random.choice(["active", "inactive"]),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=random.choice(["male", "female"]),
            date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=30),
            date_of_admission=timezone.now().date(),
            parent_mobile_number=fake.phone_number(),
            address=fake.address(),
            others=fake.text(),
            user=user,
            current_group=SubjectGroup.objects.last(
            ) if random.choice([0, 1]) == 0 else None,
        )

    # exams = Exam.objects.all()
    # for exam in exams:
    #     QuizFactory.create(
    #         exam=exam
    #     )

    # quizes = Quiz.objects.all()
    # for quiz in quizes:
    #     for _ in range(5):
    #         question = QuestionFactory.create(
    #             quiz=quiz,
    #         )
    #         for i in range(4):
    #             correct = True if i == 1 else False
    #             AnswerFactory.create(
    #                 question=question,
    #                 correct=correct,
    #             )

    last_exam = Exam.objects.filter(exam_type='i').last()
    ResultFactory.create(
        student=Student.objects.filter(current_group__isnull=True).last(),
        semester=last_academic_session,
        exam=last_exam,
        theory_score=80,
        practical_score=80,
    )
    ResultFactory.create(
        student=Student.objects.filter(current_group__isnull=False).last(),
        semester=last_academic_session,
        exam=last_exam,
        theory_score=40,
        practical_score=20,
    )

    # FeedbackFactory.create(
    #     result=result,
    # )

    # academic_config.email_enabled = 1
    # academic_config.save()

    print("Seed data created successfully.")
