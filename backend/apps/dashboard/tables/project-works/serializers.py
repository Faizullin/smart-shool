from rest_framework import serializers

from apps.dashboard.serializers import FileSerializer
from apps.exams.models import Exam
from apps.project_work.models import PracticalWork
from apps.results.models import Result
from utils.serializers import TimestampedSerializer


class PracticalWorkExamSerializer(TimestampedSerializer):
    class Meta:
        model = Exam
        fields = ('id', 'exam_type', )


class PracticalWorkResultSerializer(TimestampedSerializer):
    class Meta:
        model = Result
        fields = ('id', 'attendance', 'theory_score', 'practical_score',
                  'total_score', 'created_at', 'updated_at')


class PracticalWorkSerializer(TimestampedSerializer):
    result = serializers.SerializerMethodField(read_only=True)
    submit_exam = PracticalWorkExamSerializer(read_only=True)
    files = FileSerializer(read_only=True, many=True)

    class Meta:
        model = PracticalWork
        fields = ('id', 'title', 'submit_exam', 'student', 'result',
                  'files', 'created_at', 'updated_at')

    def get_result(self, obj: PracticalWork):
        if obj.student:
            result_item = obj.student.results.filter(
                exam=obj.submit_exam).last()
            if result_item:
                return PracticalWorkResultSerializer(result_item).data
        return None
