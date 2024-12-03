from rest_framework import serializers

from apps.academics.models import get_current_academic_config
from apps.certificates.models import Certificate
from utils.serializers import TimestampedSerializer

from .models import Exam, Feedback, Result


class ResultExamSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Exam
        fields = ['id', 'exam_type', 'subject']

    def get_subject(self, obj: Exam):
        return obj.subject.title


class ResultWithFeedbackSerializer(serializers.ModelSerializer):
    exam = ResultExamSerializer()
    access = serializers.SerializerMethodField()
    feedback_watched = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'exam', 'practical_score', 'feedback_watched',
                  'theory_score', 'total_score', 'access']

    def get_feedback_watched(self, obj: Result):
        return obj.feedback.watched if hasattr(obj, 'feedback') else False

    def get_access(self, obj: Result):
        student = self.context['request'].user.student
        certificte_queryset = obj.exam.subject.certificates
        if certificte_queryset.exists():
            return False
        elif obj.total_score is not None:
            return obj.total_score > get_current_academic_config().assign_groups_theory_min
        return None


class FeedbackSerializer(TimestampedSerializer):
    exam = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = ['id', 'exam', 'content', 'created_at', 'updated_at']

    def get_exam(self, obj: Feedback):
        return f'{obj.result.exam.id} | {obj.result.exam.exam_type}'
