from rest_framework import serializers
from .models import *
from certificates.models import Certificate
from academics.models import get_current_academic_config


class ExamSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Exam
        fields = ['id', 'exam_type','subject']
    
    def get_subject(self, obj: Exam):
        return obj.subject.title


class ResultWithFeedbackSerializer(serializers.ModelSerializer):
    exam = ExamSerializer()
    access = serializers.SerializerMethodField()
    feedback_watched = serializers.SerializerMethodField()

    class Meta:
        model = Result
        fields = ['id', 'exam', 'practical_marks', 'feedback_watched',
                  'theory_marks', 'total_marks', 'access']

    def get_feedback_watched(self, obj: Result):
        try:
            feedback_queryset = Feedback.objects.get(result=obj)
            return feedback_queryset.watched
        except Feedback.DoesNotExist:
            return True

    def get_access(self, obj: Result):
        certificte_queryset = Certificate.objects.filter(
            student=self.context['student'], subject=obj.exam.subject)
        if certificte_queryset.exists():
            return False
        else:
            return obj.total_marks > get_current_academic_config().theory_pass_min


class FeedbackSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    exam = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = ['id', 'exam', 'content', 'created_at', 'updated_at']

    def get_exam(self, obj: Feedback):
        return str(obj.result.exam)

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d %B %Y')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d %B %Y')


class ResultStatsSerializer(serializers.Serializer):
    to_show = ['practical_marks', 'theory_marks', 'total_marks']
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

    def to_representation(self, instances):
        group_by = self.validated_data.get('group_by', '')
        if group_by == 'day':
            format_string = '%Y-%m-%d'
        elif group_by == 'month':
            format_string = '%Y-%m'
        elif group_by == 'year':
            format_string = '%Y'
        else:
            group_by = 'updated_at'
            format_string = '%Y-%m-%d'

        formatted_data = []
        for item in instances:
            value = {
                'date': item[group_by].strftime(format_string)
            }

            for key in self.to_show:
                value[key] = item[key]
            formatted_data.append(value)

        return formatted_data
