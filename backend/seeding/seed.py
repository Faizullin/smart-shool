import random
from faker import Faker
from django.utils import timezone
from .factories import *


def seed():
    fake = Faker()
    random.seed(42)  # Set a seed for consistent data generation

    academic_config = AcademicConfig.objects.create(
        high_group_total_min=100,
        theory_pass_min=70,
        email_enabled=0,
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
    groupBot = GroupFactory(
        name="bot"
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
    bot = UserFactory(
        approval_status=random.choice(["a"]),
        email="bot@example.com",
        username="bot",
        password="password",
    )

    superuser1.groups.set([groupAdmin])
    superuser1.save()
    teacher1.groups.set([groupTeacher])
    teacher1.save()
    teacher2.groups.set([groupTeacher])
    teacher2.save()
    bot.groups.set([groupBot])
    bot.save()

    for _ in range(2):
        academic_session = AcademicSessionFactory(
            days=random.randint(1, 7),
        )
        academic_session.save()

    SubjectFactory(
        title='math',
    )
    SubjectFactory(
        title='physics',
    )
    last_subject = SubjectFactory(
        title='IoT',
    )

    last_academic_session = AcademicSession.objects.last()
    for i in range(2):
        SubjectGroupFactory(
            semester=last_academic_session,
            subject=last_subject,
            teacher=teacher1,
        )
    SubjectGroupFactory(
        semester=last_academic_session,
        subject=last_subject,
        teacher=teacher2,
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
        ExamFactory(
            exam_type=exam_type,
            exam_date=fake.future_datetime(end_date="+30d"),
            subject=subject
        )
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
            current_group = random.choice(SubjectGroup.objects.all()),
        )

    exams = Exam.objects.all()
    for exam in exams:
        QuizFactory.create(
            exam=exam
        )

    quizes = Quiz.objects.all()
    for quiz in quizes:
        for _ in range(5):
            question = QuestionFactory.create(
                quiz=quiz,
            )
            for i in range(4):
                correct = True if i == 1 else False
                AnswerFactory.create(
                    question=question,
                    correct=correct,
                )

    last_student = Student.objects.last()
    result = ResultFactory.create(
        student=last_student,
        semester=last_academic_session,
        exam=exam,
        theory_marks=80,
        practical_marks=80,
    )

    FeedbackFactory.create(
        result=result,
    )

    academic_config.email_enabled = 1
    academic_config.save()

    print("Seed data created successfully.")
