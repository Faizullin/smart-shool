from apps.accounts.permissions import IsStudent, get_loaded_group_names
from apps.certificates.operations import generate_cert
from apps.dashboard.models import get_teacher_exams_queryset
from apps.results.models import Student, StudentAnswer
from django.db import transaction
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .operations import re_calculate_result
from .serializers import *


class ExamListView(ListAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [
        permissions.IsAuthenticated, ]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        loaded_group_names = get_loaded_group_names(self.request.user)
        if 'teacher' in loaded_group_names:
            queryset = get_teacher_exams_queryset(self.request.user)
        elif 'student' in loaded_group_names:
            student = self.request.user.student
            if student.current_group:
                queryset = queryset.filter(
                    Q(subject=student.current_group.subject) | Q(exam_type='i')).order_by('-id')
        elif 'admin' in loaded_group_names:
            pass
        else:
            queryset = queryset.filter(exam_type='i').order_by('-id')
        return queryset.prefetch_related('subject', 'quiz')


class QuizSubmitView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent, ]

    def get_object(self, pk):
        try:
            return Quiz.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def post(self, request, pk):
        quiz = self.get_object(pk)
        student = request.user.student
        exam = quiz.exam
        if not student.current_group and exam.exam_type != 'i':
            return Response({'error': "You should have a group at first"}, status=status.HTTP_403_FORBIDDEN)
        serializer = QuizSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        questions_validated_data = validated_data.get('questions', [])
        result, created = Result.objects.get_or_create(
            student=student,
            exam=exam,
            defaults={
                'checked': False,
            },
        )
        if not created and result.attendance:
            return Response({
                'success': False,
                'detail': "You already passed a quiz"
            }, status=status.HTTP_403_FORBIDDEN)
        result.attendance = True
        result.save()
        set_checked = True
        correct_pass = False
        with transaction.atomic():
            for question_data in questions_validated_data:
                question = question_data.get('id')
                question_answers_data = question_data.get('choices', [])
                if question.type == 'c':
                    correct_answers_ids = question.choices.filter(
                        correct=True).values_list('id', flat=True)
                    submitted_answer_ids = [i for i in question_answers_data]
                    score = set([str(i) for i in correct_answers_ids]) == set(
                        [str(i) for i in submitted_answer_ids])
                    student_answer, created = StudentAnswer.objects.get_or_create(
                        question=question,
                        result=result,
                    )
                    student_answer.answer_choices.set(
                        Choice.objects.filter(id__in=submitted_answer_ids))
                    student_answer.score = int(score)
                    student_answer.save()
                elif question.type == 'o':
                    correct_answers = question.choices.filter(
                        correct=True).values('id', 'content')
                    answer_text = '\n'.join(question_answers_data)
                    score = 0
                    if len(correct_answers) == 0:
                        set_checked = False
                    else:
                        for i in correct_answers:
                            if i['content'] == answer_text:
                                score = 1
                                break
                    student_answer, created = StudentAnswer.objects.get_or_create(
                        question=question,
                        result=result,
                    )
                    student_answer.score = score
                    student_answer.answer_text = answer_text
                    student_answer.save()
                elif question.type == 'd':
                    question_subquestions = question.subquestions.all(
                    )
                    score = 1
                    question_answers_data_dict = dict()
                    subquestion_student_answers_list = []
                    for i in question_answers_data:
                        subquestion_id, answer_id = map(int, i.split('-'))
                        question_answers_data_dict[subquestion_id] = [
                            answer_id]
                        student_answer, created = StudentAnswer.objects.get_or_create(
                            # question_id=subquestion_id,
                            result=result,
                            defaults={
                                'answer_choice_id': answer_id,
                                'score': 0,
                            },
                        )
                        subquestion_student_answers_list.append(student_answer)
                    for question_subquestion in question_subquestions:
                        if not question_subquestion.pk in question_answers_data_dict.keys():
                            score = 0
                            break
                        correct_answers = question_subquestion.choices.all()
                        correct_answers_ids = [i.pk for i in correct_answers]
                        score = set([str(i) for i in correct_answers_ids]) == set(
                            [str(i) for i in question_answers_data_dict[question_subquestion.pk]])
                        if score == 0:
                            break

                    student_answer, created = StudentAnswer.objects.get_or_create(
                        question=question,
                        result=result,
                        defaults={
                            'score': score
                        }
                    )
                    student_answer.subquestions.set(
                        subquestion_student_answers_list)
                    student_answer.score = score
                    student_answer.save()
                else:
                    return Response({'success': False, 'message': 'Unsupported format error'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            result = re_calculate_result(result, save=False)
            result.checked = set_checked
            result.save()
            correct_pass = True
        if correct_pass:
            if exam.exam_type == 'f':
                cert = generate_cert(
                    student=student, subject=student.current_group.subject)
            elif exam.exam_type == 'i':
                return Response({'success': True}, status=status.HTTP_200_OK)

        return Response({'success': True}, status=status.HTTP_200_OK)


class QuizQuestionListView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [
        permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get(self, request, *args, **kwargs):
        quiz_id = self.kwargs['pk']
        quiz = get_object_or_404(Quiz, id=quiz_id)
        student = request.user.student
        if Result.objects.filter(exam_id=quiz.exam_id, attendance=True, student=student).exists():
            return Response({
                'success': False,
                'detail': "You already passed a quiz"
            }, status=status.HTTP_403_FORBIDDEN)
        queryset = self.filter_queryset(
            Question.objects.prefetch_related('choices').filter(quiz=quiz))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


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
