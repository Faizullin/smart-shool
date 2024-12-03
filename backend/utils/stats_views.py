from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from django.db.models.functions import TruncDay, TruncMonth, TruncYear
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from datetime import datetime, timedelta
from rest_framework import serializers


class AbstractStatsSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=False, format='%Y-%m-%d')
    end_date = serializers.DateField(required=False, format='%Y-%m-%d')
    group_by = serializers.ChoiceField(
        choices=['day', 'month', 'year'], required=False)

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError(
                "Start date cannot be later than end date.")
        return data


class AbstractStatsView(APIView):
    model = None  # Set this to the model you are working with
    date_field = 'updated_at'  # Replace with the date field of your model
    serializer_class = AbstractStatsSerializer
    filter_class = None
    queryset = None
    to_show_avg = {

    }
    to_show_count = {
        'count': 'id'
    }

    def get_queryset_initial(self):
        return self.queryset

    def get_queryset(self, validated_data):
        queryset = self.get_queryset_initial()
        if self.filter_class is not None:
            filter_class = self.filter_class(
                data=self.request.query_params, queryset=queryset)
            if filter_class.is_valid():
                queryset = filter_class.qs
        start_date = validated_data.get('start_date', None)
        end_date = validated_data.get('end_date', None)
        group_by = validated_data.get('group_by', None)
        if not end_date:
            end_date = datetime.now().date() + timedelta(days=2)
        if not start_date:
            start_date = end_date - timedelta(days=30)

        queryset = queryset.filter(
            **{f"{self.date_field}__range": [start_date, end_date]})

        data_count = {}
        data_avg = {}
        for key, value in self.to_show_count.items():
            data_count[key] = Count(value)
        for key, value in self.to_show_avg.items():
            data_count[key] = Avg(value)
        if group_by == 'month':
            queryset = queryset.annotate(month=TruncMonth(self.date_field)).values('month').annotate(
                **data_count,
                **data_avg,
            ).order_by('month')
        elif group_by == 'year':
            queryset = queryset.annotate(year=TruncYear(self.date_field)).values('year').annotate(
                **data_count,
                **data_avg,
            ).order_by('year')
        elif group_by == 'day':
            queryset = queryset.annotate(day=TruncDay(self.date_field)).values('day').annotate(
                **data_count,
                **data_avg,
            ).order_by('day')
        else:
            queryset = queryset.values(
                self.date_field,
                *self.to_show_count.values(),
                *self.to_show_avg.values(),
            ).order_by(self.date_field)
        return queryset

    # Cache for 15 minutes @method_decorator(cache_page(60 * 15))
    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        self.request = request
        queryset = self.get_queryset(serializer.validated_data)
        data = self.get_results_data(serializer.validated_data, queryset)
        return Response(data)

    def get_results_data(self, validated_data, queryset):
        return {

        }

    def get_date_str(self, value, format_string: str):
        return value.strftime(format_string)

    def get_date_data(self, validated_data):
        group_by = validated_data.pop('group_by', '')
        if group_by == 'day':
            format_string = '%Y-%m-%d'
        elif group_by == 'month':
            format_string = '%Y-%m'
        elif group_by == 'year':
            format_string = '%Y'
        else:
            group_by = 'updated_at'
            format_string = '%Y-%m-%d'
        return group_by, format_string
