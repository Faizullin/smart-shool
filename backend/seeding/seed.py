import json

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from apps.academics.models import Subject, SubjectGroup, AcademicSession
from apps.accounts.groups import AdminGroup, DeveloperGroup, StaffGroup, TeacherGroup, StudentGroup
from apps.accounts.models import UserApprovalStatus
from apps.articles.models import Article, PopularArticle
from apps.exams.models import Exam, Quiz, Question, Choice
from apps.students.models import Student

User = get_user_model()


def seed_users():
    groupStudent = Group.objects.get(
        id=StudentGroup.id,
    )

    def read_users(path):
        with open(path, "r") as f:
            data = json.load(f)
        return [i for i in data if type(i['email']) is str]

    for i in read_users("./seeding/output/users1.json"):
        u = User.objects.create_user(**i, approval_status=UserApprovalStatus.APPROVED)
        u.groups.set([groupStudent])
        Student.objects.create(
            user=u,
        )
    for i in read_users("./seeding/output/users2.json"):
        u = User.objects.create_user(**i, approval_status=UserApprovalStatus.APPROVED)
        u.groups.set([groupStudent])
        Student.objects.create(
            user=u,
        )


def seed_questions(quiz):
    def read_questions(path):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data

    for i in read_questions("./seeding/output/quiz_data.json"):
        correct_answer_option = ["a", "b", "c", "d"].index(i["answer"][0])
        question = Question.objects.create(
            type="c",
            quiz=quiz,
            prompt=i["question"],
            index=i["index"],
        )
        for ai, a in enumerate(i["options"]):
            Choice.objects.create(
                question=question,
                correct=correct_answer_option == ai,
                content=a,
            )


def seed(use_allauth):
    # academic_config = AcademicConfig.objects.create(
    #     email_enabled=False
    # )
    if use_allauth:
        from allauth.account.models import EmailAddress
    groupAdmin = Group.objects.create(
        name=AdminGroup.name,
        id=AdminGroup.id,
    )
    groupDeveloper = Group.objects.create(
        name=DeveloperGroup.name,
        id=DeveloperGroup.id,
    )
    groupStaff = Group.objects.create(
        name=StaffGroup.name,
        id=StaffGroup.id,
    )
    groupTeacher = Group.objects.create(
        name=TeacherGroup.name,
        id=TeacherGroup.id,
    )
    groupStudent = Group.objects.create(
        name=StudentGroup.name,
        id=StudentGroup.id,
    )
    user1 = User.objects.create_user(
        username="admin",
        email="admin@example.com",
        password="admin.password@1234",
        approval_status=UserApprovalStatus.APPROVED,
        is_staff=True,
        is_superuser=True,
    )
    if use_allauth:
        EmailAddress.objects.create(
            user=user1,
            email=user1.email,
            verified=True,
        )
    user1.groups.set([groupAdmin, groupDeveloper])
    user2 = User.objects.create_user(
        username="user1",
        email="user1@example.com",
        password="user1.password@1234",
        approval_status=UserApprovalStatus.APPROVED,
        is_staff=True,
    )
    if use_allauth:
        EmailAddress.objects.create(
            user=user2,
            email=user2.email,
            verified=True,
        )
    user2.groups.set([groupDeveloper])
    user3 = User.objects.create_user(
        username="user3",
        email="user3@example.com",
        password="user3.password@1234",
        approval_status=UserApprovalStatus.APPROVED,
    )
    if use_allauth:
        EmailAddress.objects.create(
            user=user3,
            email=user3.email,
            verified=True,
        )

    user4 = User.objects.create_user(
        username="user4",
        email="user4@example.com",
        password="user4.password@1234",
        approval_status=UserApprovalStatus.APPROVED,
    )
    if use_allauth:
        EmailAddress.objects.create(
            user=user4,
            email=user4.email,
            verified=True,
        )
    user4.groups.set([groupStudent])

    user5 = User.objects.create_user(
        username="user5",
        email="user5@example.com",
        password="user5.password@1234",
        approval_status=UserApprovalStatus.APPROVED,
        is_staff=True,
    )
    if use_allauth:
        EmailAddress.objects.create(
            user=user5,
            email=user5.email,
            verified=True,
        )
    user5.groups.set([groupTeacher])

    seed_users()

    academic_session1 = AcademicSession.objects.create(
        days=60,
    )
    iot1_subject = Subject.objects.create(
        title="iot-1"
    )
    subject_group_1 = SubjectGroup.objects.create(
        title=f"Group for {iot1_subject.title}",
        semester=academic_session1,
        subject=iot1_subject,
        teacher=user5
    )
    article1 = Article.objects.create(
        title="article 1",
        featured_image=None,
        subject=iot1_subject,
        content="",
        status="published"
    )
    pop_article = PopularArticle.objects.create(
        status="published",
    )
    pop_article.items.set([article1])

    student_for_user_4 = Student.objects.create(
        user=user4,
        current_status="active",
        current_group=subject_group_1,
    )

    exam1 = Exam.objects.create(
        exam_type='m',
        subject=iot1_subject
    )
    exam1.subject_groups.set([subject_group_1])

    quiz1 = Quiz.objects.create(
        exam=exam1,
        title=f"Quiz for {exam1}",
    )
    article1.quiz = quiz1
    article1.save()

    seed_questions(quiz1)

    print("Seed data created successfully.")
