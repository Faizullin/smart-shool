import json
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.http import Http404

from .models import *
from .serializers import *
from accounts.permissions import *
from results.models import *
from django.db.models import Q

# Create your views here.


class ExamListView(ListAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        student = self.request.student
        context['request'] = self.request
        context['student'] = student
        return context

    def get_queryset(self):
        student = self.request.student
        if student.current_group:
            return Exam.objects.filter(Q(subject=student.current_group.subject) | Q(exam_type='i')).order_by('-id')
        else:
            return Exam.objects.filter(exam_type='i').order_by('-id')


class QuizListView(ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        student = self.request.student
        exams = Exam.objects.filter(subject_group=student.current_group)
        return Quiz.objects.filter(exam__in=exams)


class QuizRetrieveView(RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class QuizSubmitView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_object(self, pk):
        try:
            return Quiz.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def post(self, request, pk):
        quiz = self.get_object(pk)
        student = request.student
        current_acacdemic_session = AcademicSession.objects.last()
        exam = quiz.exam

        input_data = request.data
        existing_result = Result.objects.filter(exam=exam, student=student)
        if existing_result.exists():
            return Response({'success': False, 'message': 'You passed already tried a quiz! Please contact to teacher!'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = QuizSubmitSerializer(data={
            'questions': input_data.get('questions'),
        })
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        questions_queryset = quiz.questions.all()
        total_questions_count = quiz.questions_count
        total_correct_answers = 0
        # Iterate over each submitted question
        for submitted_question in validated_data['questions']:
            # Retrieve the corresponding question object

            try:
                question = questions_queryset.get(id=submitted_question['id'])
            except Question.DoesNotExist:
                raise Http404
            if question.type == 'c':
                correct_answer_ids = question.answers.filter(
                    correct=True).values_list('id', flat=True)
                score = set([str(i) for i in correct_answer_ids]
                            ) == set(submitted_question['answers'])
                if score:
                    total_correct_answers += 1
                selected_answer = question.answers.get(
                    id=submitted_question['answers'][0])
                student_answer, created = StudentAnswer.objects.get_or_create(
                    question=question,
                    student=student,
                )
                student_answer.selected_answer = selected_answer
                student_answer.score = int(score)
                student_answer.save()
            elif question.type == 'o':
                result_text = ''
                result_arr = submitted_question['answers']
                if len(result_arr) > 0:
                    result_text = '\n'.join(result_arr)
                student_answer, created = StudentAnswer.objects.get_or_create(
                    question=question,
                    student=student,
                )
                student_answer.answer_text = result_text
                student_answer.score = 0
                student_answer.save()

        score_percent = (total_correct_answers / total_questions_count) * 100

        if exam.exam_type == 'i':
            new_result = Result.objects.create(
                student=student,
                semester=current_acacdemic_session,
                exam=exam,
                theory_marks=score_percent,
            )
            return Response({'success': True}, status=status.HTTP_200_OK)

        if not student.current_group:
            return Response({'error': "You should have a group at first"}, status=status.HTTP_403_FORBIDDEN)
        results = Result.objects.filter(
            semester=student.current_group.semester,
            student=student,
            exam=exam,
        )
        if results.exists():
            result = results.last()
            result.theory_marks = score_percent
            result.save()
        else:
            new_result = Result.objects.create(
                semester=student.current_group.semester,
                student=student,
                exam=exam,
                theory_marks=score_percent,
            )

        return Response({'success': True}, status=status.HTTP_200_OK)


class ExamProjectRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamProjectSubmitSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.student
        return Exam.objects.filter(subject_group=student.current_group)


class ExamProjectSubmitView(CreateAPIView):
    queryset = Practical.objects.all()
    serializer_class = ExamProjectSubmitSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]


class QuizQuestionListView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        quiz_id = self.kwargs['pk']
        return Question.objects.filter(quiz=quiz_id)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class QuizInititalMyView(APIView):
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get(self, request):
        student = request.student
        exam = Exam.objects.filter(
            exam_type='i', subject_group=student.current_group)
        if exam.last():
            return Response({
                'success': True,
                'id': exam.last().pk
            })
        return Response({
            'success': False,
            'error': 'Not Found'
        })
