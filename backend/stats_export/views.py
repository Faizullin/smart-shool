from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework import permissions, status, permissions
import csv
from django.utils.encoding import smart_str
import xlwt

from accounts.permissions import IsStudent
from results.models import Result
from students.models import Student


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
    columns = ['practical_marks', 'theory_marks', 'total_marks']

    # write column headers in sheet
    for col_num in range(len(columns)):
        ws.write(row_num, col_num + 1, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    # get your data, from database or from a text file...
    # dummy method to fetch data.
    for my_row in data:
        row_num = row_num + 1
        ws.write(row_num, 1, my_row.practical_marks, font_style)
        ws.write(row_num, 2, my_row.theory_marks, font_style)
        ws.write(row_num, 3, my_row.total_marks, font_style)
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
        smart_str(u"practical_marks"),
        smart_str(u"theory_marks"),
        smart_str(u"total_marks"),
    ])

    for i in data:
        writer.writerow([
            smart_str(i.practical_marks),
            smart_str(i.theory_marks),
            smart_str(i.total_marks),
        ])
    return response


class DownloadFileView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get(self, request, model, format_type):
        print('model',model)
        if model == 'results':
            items = Result.objects.filter(
                student=Student.objects.get(user=request.user))
            # format_type = request.GET.get('format', 'xlsx')
            if format_type == 'xlsx':
                return get_xlsx(items, model)
            elif format_type == 'csv':
                return get_csv(items, model)

        return HttpResponseBadRequest()
