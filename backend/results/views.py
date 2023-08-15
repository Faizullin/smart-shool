from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import permissions, status, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from django.db.models.functions import TruncDay, TruncMonth, TruncYear
from django.db.models import Count, Avg


from .models import *
from .serializers import *
from accounts.permissions import *
import datetime


class ResultListView(ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultWithFeedbackSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]
    ordering = ['-id']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        context['student'] = Student.objects.get(user=self.request.user)
        return context

    def get_queryset(self):
        student = Student.objects.get(user_id=self.request.user.pk)
        return Result.objects.filter(student=student)


class ExamFeedbackRetrieve(RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_object(self):
        try:
            feedback = Feedback.objects.get(
                result__exam_id=self.kwargs['exam_id'], result__student=Student.objects.get(user=self.request.user))
            if not feedback.watched:
                feedback.watched = True
                feedback.save()
            return feedback
        except Feedback.DoesNotExist:
            raise Http404


def get_results_data(request, validated_data, basic_queryset):
    start_date = validated_data.get('start_date')
    end_date = validated_data.get('end_date')
    group_by = validated_data.get('group_by')
    if not end_date:
        end_date = datetime.datetime.now().date() + datetime.timedelta(days=1)
    if not start_date:
        start_date = end_date - datetime.timedelta(days=30)
    queryset = basic_queryset.filter(updated_at__range=[start_date, end_date])
    if group_by == 'month':
        queryset = queryset.annotate(month=TruncMonth('updated_at')).values('month').annotate(
            count=Count('id'),
            practical_marks=Avg('practical_marks'),
            theory_marks=Avg('theory_marks'),
            total_marks=Avg('total_marks'),
        ).order_by('month')
    elif group_by == 'year':
        queryset = queryset.annotate(year=TruncYear('updated_at')).values('year').annotate(
            count=Count('id'),
            practical_marks=Avg('practical_marks'),
            theory_marks=Avg('theory_marks'),
            total_marks=Avg('total_marks'),
        ).order_by('year')
    elif group_by == 'day':
        queryset = queryset.annotate(day=TruncDay('updated_at')).values('day').annotate(
            count=Count('id'),
            practical_marks=Avg('practical_marks'),
            theory_marks=Avg('theory_marks'),
            total_marks=Avg('total_marks'),
        ).order_by('day')
    else:
        queryset = queryset.values(
            'practical_marks',
            'theory_marks',
            'total_marks',
            'updated_at',
        ).order_by('updated_at')
    return queryset


class ResultStatsListView(APIView):
    queryset = Result.objects.all()
    serializer_class = ResultWithFeedbackSerializer

    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get(self, request):
        serializer = ResultStatsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        student = Student.objects.get(user_id=self.request.user.pk)
        queryset = Result.objects.filter(student=student)
        queryset = get_results_data(request, validated_data, queryset)

        formatted_data = serializer.to_representation(queryset)
        return Response(formatted_data)
