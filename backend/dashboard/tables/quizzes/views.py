from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from accounts.permissions import IsAdmin
from exams.models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, QuestionAnswerSerializer
from .filters import QuizPagination, QuestionPagination, ORDERING_FIELDS, FILTERSET_FIELDS, SEARCH_FILTERSET_FIELDS


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = FILTERSET_FIELDS
    ordering_fields = ORDERING_FIELDS
    pagination_class = QuizPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = []
    ordering_fields = ['id']
    pagination_class = QuestionPagination
    search_fields = []
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        quiz_pk = self.kwargs.get('quizes_pk')
        return Question.objects.filter(quiz_id=quiz_pk)

    def generate_answers(self, question: Question, validated_data):
        for item in validated_data:
            Answer.objects.create(
                question=question,
                content=item.get('content'),
                correct=item.get('correct', False),
            )

    def create(self, request, *args, **kwargs):
        data = request.data
        quiz_id = self.kwargs.get('quizes_pk', None)
        quiz = get_object_or_404(Quiz, pk=quiz_id)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        validated_data.pop('answers', [])
        question = Question.objects.create(
            **validated_data,
            quiz=quiz,
        )
        answers_data = data.get('answers', None)
        answers_serializer = QuestionAnswerSerializer(
            data=answers_data, many=True)
        answers_serializer.is_valid(raise_exception=True)
        validated_data = answers_serializer.validated_data
        self.generate_answers(question, validated_data)
        return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        question = self.get_object()
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        validated_data.pop('answers', [])
        question.prompt = data.get('prompt')
        question.type = data.get('type', 'c')
        question.save()

        answers_data = data.get('answers', None)
        answers_serializer = QuestionAnswerSerializer(
            data=answers_data, many=True)
        answers_serializer.is_valid(raise_exception=True)
        validated_data = answers_serializer.validated_data

        question.answers.all().delete()
        self.generate_answers(question, validated_data)

        return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)
