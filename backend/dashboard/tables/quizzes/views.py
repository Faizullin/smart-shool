from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from accounts.permissions import IsAdmin
from exams.models import Quiz, Question, Answer, DraggableSubQuestion
from .serializers import QuizSerializer, QuestionSerializer, QuestionAnswerSerializer, DraggableQuestionSubmitSerializer
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
    # permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        quiz_pk = self.kwargs.get('quizes_pk')
        return Question.objects.filter(quiz_id=quiz_pk)

    def generate_answers(self, question: Question, validated_data):
        for item in validated_data:
            answer = Answer.objects.create(
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
        question_type = validated_data.pop('type', None)
        if question_type == 'd':
            question = Question.objects.create(
                **validated_data,
                quiz=quiz,
                type=question_type,
            )
            draggable_serializer = DraggableQuestionSubmitSerializer(
                data=data)
            draggable_serializer.is_valid(raise_exception=True)
            validated_data = draggable_serializer.validated_data
            subquestions_data = validated_data.pop('subquestions', [])
            answers_data = validated_data.pop('answers', [])
            subquestion_answers_dict = {}
            for i in answers_data:
                if i.get('uid', None) is not None:
                    subquestion_answers_dict[i.get('uid')] = Answer.objects.create(
                        question=question,
                        content=i.get('content'),
                        correct=i.get('correct', False),
                    )
            for subquestion_item_data in subquestions_data:
                q = DraggableSubQuestion.objects.create(
                    prompt=subquestion_item_data.get('prompt', ''),
                    source_question=question)
                for answer_uid in subquestion_answers_dict.keys():
                    if answer_uid in subquestion_item_data.get('answers', []):
                        q.correct_answers.set(
                            [subquestion_answers_dict[answer_uid]])

        elif question_type in ['c', 'o']:
            question = Question.objects.create(
                **validated_data,
                quiz=quiz,
                type=question_type,
            )
            answers_data = data.get('answers', [])
            answers_serializer = QuestionAnswerSerializer(
                data=answers_data, many=True)
            answers_serializer.is_valid(raise_exception=True)
            self.generate_answers(question, answers_serializer.validated_data)
        return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        question = self.get_object()
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        question.prompt = data.get('prompt', '')
        question.type = data.get('type', 'c')

        validated_data = serializer.validated_data
        question_type = validated_data.pop('type', None)
        if question_type == 'd':
            draggable_serializer = DraggableQuestionSubmitSerializer(
                data=data)
            draggable_serializer.is_valid(raise_exception=True)
            question.save()
            question.draggable_subquestions.all().delete()
            question.answers.all().delete()
            validated_data = draggable_serializer.validated_data
            subquestions_data = validated_data.pop('subquestions', [])
            answers_data = validated_data.pop('answers', [])
            subquestion_answers_dict = {}
            for i in answers_data:
                if i.get('uid', None) is not None:
                    subquestion_answers_dict[i.get('uid')] = Answer.objects.create(
                        question=question,
                        content=i.get('content'),
                        correct=i.get('correct', False),
                    )
            for subquestion_item_data in subquestions_data:
                q = DraggableSubQuestion.objects.create(
                    prompt=subquestion_item_data.get('prompt', ''),
                    source_question=question)
                for answer_uid in subquestion_answers_dict.keys():
                    if answer_uid in subquestion_item_data.get('answers', []):
                        q.correct_answers.set(
                            [subquestion_answers_dict[answer_uid]])

        elif question_type in ['c', 'o']:
            answers_data = data.get('answers', None)
            answers_serializer = QuestionAnswerSerializer(
                data=answers_data, many=True)
            answers_serializer.is_valid(raise_exception=True)
            question.save()
            question.answers.all().delete()
            self.generate_answers(question, answers_serializer.validated_data)
        return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)
