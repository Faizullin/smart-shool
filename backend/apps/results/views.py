from rest_framework import permissions, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from .models import Result
from .serializers import *
from apps.accounts.permissions import IsStudent
from utils.stats_views import AbstractStatsView
from django.utils.encoding import smart_str
from django.db.models import Prefetch
import xlwt
import csv


class ResultListView(ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultWithFeedbackSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        student = self.request.user.student
        return Result.objects.select_related('exam__subject', 'feedback').prefetch_related(
            Prefetch('exam__subject__certificates',
                     queryset=Certificate.objects.filter(student=student))
        ).filter(student=student).order_by('-id')


class ExamFeedbackRetrieve(RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_object(self):
        student = self.request.user.student
        try:
            feedback = Feedback.objects.select_related('result__exam').get(
                id=self.kwargs['exam_id'], result__student=student)
            return feedback
        except Feedback.DoesNotExist:
            raise Http404


class ResultStatsListView(AbstractStatsView):
    queryset = Result.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsStudent]
    to_show_avg = {
        'total_score': 'total_score', 'practical_score': 'practical_score', 'theory_score': 'theory_score'
    }
    to_show_count = {'count': 'id'}

    def get_queryset(self, validated_data):
        student = self.request.user.student
        return super().get_queryset(validated_data).filter(student=student)

    def get_results_data(self, validated_data, queryset):
        group_by, format_string = self.get_date_data(
            validated_data=validated_data)
        formatted_data = []
        for item in queryset:
            value = {
                'date': self.get_date_str(item[group_by], format_string)
            }
            for key in self.to_show_avg.values():
                value[key] = item[key]
            formatted_data.append(value)
        return {
            'chart_data': formatted_data
        }


def get_xlsx(data, model_name):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="' + \
        model_name+'.xlsx"'
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet("sheet1")
    row_num = 0
    font_style = xlwt.XFStyle()

    # headers are bold
    font_style.font.bold = True

    # column header names, you can use your own headers here
    columns = ['practical_score', 'theory_score', 'total_score']

    # write column headers in sheet
    for col_num in range(len(columns)):
        ws.write(row_num, col_num + 1, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    # get your data, from database or from a text file...
    # dummy method to fetch data.
    for my_row in data:
        row_num = row_num + 1
        ws.write(row_num, 1, my_row.practical_score, font_style)
        ws.write(row_num, 2, my_row.theory_score, font_style)
        ws.write(row_num, 3, my_row.total_score, font_style)
        # ws.write(row_num, 3, my_row.date, font_style)

    wb.save(response)
    return response


def get_csv(data, model_name):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="' + \
        model_name+'.csv"'

    writer = csv.writer(response, csv.excel)

    # write the headers
    writer.writerow([
        smart_str(u"practical_score"),
        smart_str(u"theory_score"),
        smart_str(u"total_score"),
    ])

    for i in data:
        writer.writerow([
            smart_str(i.practical_score),
            smart_str(i.theory_score),
            smart_str(i.total_score),
        ])
    return response


class ResultDownloadFileView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get(self, request, format_type):
        items = Result.objects.filter(
            student=request.user.student)
        if format_type == 'xlsx':
            return get_xlsx(items, 'result')
        elif format_type == 'csv':
            return get_csv(items, 'result')
        return HttpResponseBadRequest()
