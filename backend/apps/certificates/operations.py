from django.conf import settings
from datetime import datetime
from apps.students.models import Student
from apps.academics.models import Subject
from .models import Certificate
from PIL import Image, ImageDraw, ImageFont
from apps.file_system.models import File as FileModel
import os


def generate_cert_file(instance: Certificate, subject: Subject):
    student = instance.student

    certificate_template = Image.open(
        'certificates/template_data/template2.png')
    draw = ImageDraw.Draw(certificate_template)
    font = ImageFont.truetype(
        'certificates/template_data/fonts/Oswald-Regular.ttf', size=55)
    font40 = ImageFont.truetype(
        'certificates/template_data/fonts/Oswald-Regular.ttf', size=40)

    # Customize the certificate content based on student data
    start_x = 100
    start_y = 100

    draw.text((start_x, start_y),
              f"Вручается за успехи ученику", font=font, fill='black')
    draw.text((start_x, start_y + 130),
              f"{student.user.username}", font=font, fill='black')
    draw.text((start_x, start_y + 210),
              f"По предмету: {subject.title}", font=font, fill='black')
    draw.text((start_x, start_y + 400),
              f"{instance.created_at}", font=font40, fill='blue')
    certificate_image_path = f'files/certificate_{student.id}_{subject.pk}_{datetime.now().strftime("%Y%m%d%H%M%S")}.png'
    certificate_image_path_full = os.path.join(
        settings.BASE_DIR, f'media/{certificate_image_path}')
    smaller_certificate_image = certificate_template.resize((800, 600))
    smaller_certificate_image.save(certificate_image_path_full, quality=45)
    image = FileModel.objects.create(file=certificate_image_path)
    instance.image = image
    instance.save()
    return instance


def generate_cert(student: Student, subject=None):
    if subject is None:
        subject = student.current_group.subject
    student_certificate = Certificate(
        student=student, subject=subject)
    student_certificate = generate_cert_file(student_certificate, subject)
    return student_certificate
