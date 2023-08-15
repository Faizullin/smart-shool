import factory
from factory.django import DjangoModelFactory
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from accounts.models import *
from students.models import *
from articles.models import *
from results.models import *
from academics.models import *
from exams.models import *


class GroupFactory(DjangoModelFactory):
    class Meta:
        model = Group
    name = factory.Sequence(lambda n: f"group{n}")


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Faker("user_name")
    email = factory.Faker("email")
    approval_status = factory.Iterator(['n', 'p', 'd', 'a'])
    password = factory.PostGenerationMethodCall('set_password',
                                                'defaultpassword')


class SuperuserFactory(UserFactory):
    is_staff = True
    is_superuser = True


class AcademicSessionFactory(DjangoModelFactory):
    class Meta:
        model = AcademicSession
    days = factory.Faker("pyint")


class SubjectFactory(DjangoModelFactory):
    class Meta:
        model = Subject
    title = factory.Faker("text", max_nb_chars=10)


class SubjectGroupFactory(DjangoModelFactory):
    class Meta:
        model = SubjectGroup
    # teacher = factory.SubFactory(UserFactory)
    # semester = factory.SubFactory(AcademicSessionFactory)
    # subject = factory.SubFactory(SubjectFactory)


class StudentFactory(DjangoModelFactory):
    class Meta:
        model = Student
    # user = factory.SubFactory(User)
    current_status = factory.Iterator(["active", "inactive"])
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    gender = factory.Iterator(["male", "female"])
    date_of_birth = factory.Faker(
        "date_of_birth", minimum_age=18, maximum_age=25)
    # current_group = factory.SubFactory(SubjectGroupFactory)
    date_of_admission = factory.Faker(
        "date_between", start_date='-2y', end_date='today')
    parent_mobile_number = factory.Faker("numerify", text="##########")
    address = factory.Faker("address")
    others = factory.Faker("text", max_nb_chars=200)


class ExamFactory(DjangoModelFactory):
    class Meta:
        model = Exam

    exam_type = factory.Iterator(['i', 'm', 'f',])
    exam_date = factory.Faker("date_time_this_year")
    # subject = factory.SubFactory(SubjectFactory)


class QuizFactory(DjangoModelFactory):
    class Meta:
        model = Quiz

    # exam = factory.SubFactory(ExamFactory)
    time = factory.Faker('random_int', min=60, max=600)
    start_date_time = factory.LazyFunction(timezone.now)
    end_date_time = factory.LazyFunction(timezone.now)


class QuestionFactory(DjangoModelFactory):
    class Meta:
        model = Question

    # quiz = factory.SubFactory(QuizFactory)
    prompt = factory.Faker('sentence')


class AnswerFactory(DjangoModelFactory):
    class Meta:
        model = Answer

    # question = factory.SubFactory(QuestionFactory)
    content = factory.Faker('sentence')
    correct = factory.Faker('boolean')


class ResultFactory(DjangoModelFactory):
    class Meta:
        model = Result

    # student = factory.SubFactory(StudentFactory)
    # semester = factory.SubFactory(AcademicSessionFactory)
    # exam = factory.SubFactory(ExamFactory)
    practical_marks = factory.Faker("random_int", min=0, max=100)
    theory_marks = factory.Faker("random_int", min=0, max=100)


class FeedbackFactory(DjangoModelFactory):
    class Meta:
        model = Feedback

    # result = factory.SubFactory(ResultFactory)
    content = factory.Faker('text')
