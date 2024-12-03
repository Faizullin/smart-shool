from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from apps.accounts.permissions import IsTeacherOrAdmin
from apps.exams.models import Quiz, Question, Choice
from .serializers import QuizSerializer, QuestionListSerializer, QuestionRetrieveSerializer, QuestionSubmitSerializer
from .filters import QuizPagination, QuestionPagination, ORDERING_FIELDS, QuizFilter, SEARCH_FILTERSET_FIELDS


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = QuizFilter
    ordering_fields = ORDERING_FIELDS
    pagination_class = QuizPagination
    search_fields = SEARCH_FILTERSET_FIELDS
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = []
    ordering_fields = ['id']
    pagination_class = QuestionPagination
    search_fields = []
    
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return QuestionSubmitSerializer
        elif self.action == 'retrieve':
            return QuestionRetrieveSerializer
        else:
            return super().get_serializer_class()

    def get_queryset(self):
        quiz_pk = self.kwargs.get('quizes_pk')
        return Question.objects.filter(quiz_id=quiz_pk)

    def get_quiz_object(self):
        quiz_id = self.kwargs.get('quizes_pk', None)
        return get_object_or_404(Quiz, pk=quiz_id)

    def generate_answers(self, question: Question, validated_data):
        for item in validated_data:
            answer = Choice.objects.create(
                question=question,
                content=item.get('content'),
                correct=item.get('correct', False),
            )

    def create(self, request, *args, **kwargs):
        quiz = self.get_quiz_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        question_type = validated_data.get('type')
        if question_type == 'd':
            question = Question.objects.create(
                prompt=validated_data.get('prompt', ''),
                quiz=quiz,
                type=question_type,
            )
            choices_data = validated_data.pop('choices', [])
            subquestions_data = validated_data.pop(
                'subquestions', [])
            subquestion_choices_dict = {}
            for i in choices_data:
                if i.get('uid', None) is not None:
                    subquestion_choices_dict[i.get('uid')] = Choice.objects.create(
                        question=question,
                        content=i.get('content'),
                        correct=i.get('correct', False),
                    )
            for subquestion_item_data in subquestions_data:
                q = Question.objects.create(
                    prompt=subquestion_item_data.get('prompt', ''),
                    type='c',
                    parent_question=question,
                )
                for choice_uid in subquestion_choices_dict.keys():
                    if choice_uid in subquestion_item_data.get('answers', []):
                        q.choices.set(
                            [subquestion_choices_dict[choice_uid]])

        elif question_type in ['c', 'o']:
            question = Question.objects.create(
                prompt=validated_data.get('prompt', ''),
                quiz=quiz,
                type=question_type,
            )
            choices_data = validated_data.get('choices', [])
            self.generate_answers(question, choices_data)

        return Response(QuestionRetrieveSerializer(question).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        quiz = self.get_quiz_object()
        question = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        question_type = validated_data.get('type')
        if question_type == 'd':
            draggable_serializer = DraggableQuestionSubmitSerializer(
                data=validated_data.get('choices'))
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
                    subquestion_answers_dict[i.get('uid')] = Choice.objects.create(
                        question=question,
                        content=i.get('content'),
                        correct=i.get('correct', False),
                    )
            for subquestion_item_data in subquestions_data:
                q = Question.objects.create(
                    prompt=subquestion_item_data.get('prompt', ''),
                    source_question=question)
                for answer_uid in subquestion_answers_dict.keys():
                    if answer_uid in subquestion_item_data.get('answers', []):
                        q.correct_answers.set(
                            [subquestion_answers_dict[answer_uid]])

        elif question_type in ['c', 'o']:
            question.prompt = validated_data.get('prompt')
            question.type = validated_data.get('type')
            question.save()
            question.choices.all().delete()
            self.generate_answers(question, validated_data.get('choices', []))
        return Response(QuestionRetrieveSerializer(question).data, status=status.HTTP_201_CREATED)
