from rest_framework import serializers
from apps.certificates.models import Certificate, Subject, Student
from apps.dashboard.serializers import FileSerializer, StudentSerializer
from utils.serializers import TimestampedSerializer
from apps.certificates.operations import generate_cert_file
from apps.dashboard.tables.subjects.serializers import SubjectSerializer


class CertificateSerializer(TimestampedSerializer):
    image = FileSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    generate_file = serializers.BooleanField(write_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=Student.objects.all())
    subject_id = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=Subject.objects.all())

    class Meta:
        model = Certificate
        fields = ('id', "student", "subject", "subject_id", 'student_id', "image", "generate_file",
                  "created_at",  'updated_at')

    def create(self, validated_data):
        generate_file = validated_data.pop('generate_file', False)
        subject = validated_data.pop('subject_id', None)
        student = validated_data.pop('student_id')
        if subject is None:
            subject = student.current_group.subject
        instance = Certificate.objects.create(student=student, subject=subject)
        if generate_file:
            instance = generate_cert_file(instance, subject)
        return instance

    def update(self, instance: Certificate, validated_data):
        generate_file = validated_data.pop('generate_file', False)
        subject = validated_data.pop('subject_id', None)
        student = validated_data.pop('student_id')
        if subject is None:
            subject = student.current_group.subject
        instance.subject = subject
        instance.student = student
        instance.save()
        if generate_file:
            instance = generate_cert_file(instance, subject)
        return instance
