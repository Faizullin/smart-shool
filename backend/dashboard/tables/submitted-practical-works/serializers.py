from rest_framework import serializers
from results.models import SubmittedPracticalWork
from dashboard.tables.exams.serializers import ExamSerializer, Exam
from dashboard.serializers import StudentSerializer, Student,  FileSerializer, FileModel
from utils.serializers import TimestampedSerializer


class SubmittedPracticalWorkSerializer(TimestampedSerializer):
    exam = ExamSerializer(read_only=True)
    exam_id = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all(),
        write_only=True,
    )
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(),
        write_only=True,
    )
    files = FileSerializer(many=True, required=False)
    file_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, required=False, queryset=FileModel.objects.all())

    class Meta:
        model = SubmittedPracticalWork
        fields = ('id', 'title', 'exam', 'exam_id', 'student', 'student_id', 'files',
                  'file_ids', 'created_at', 'updated_at')

    def create(self, validated_data):
        student = validated_data.pop('student_id', None)
        exam = validated_data.pop('exam_id', None)
        submitted_practical_work = SubmittedPracticalWork.objects.create(
            **validated_data, student_id=student.pk, exam_id=exam.pk)
        return submitted_practical_work

    def update(self, instance: SubmittedPracticalWork, validated_data):
        file_ids = validated_data.pop('file_ids', [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        instance.files.set(file_ids)
        return instance
