from django.conf import settings
from datetime import datetime
from students.models import Student
from academics.models import Subject
from .models import Certificate
from PIL import Image, ImageDraw, ImageFont
import os


def generate_cert(student: Student, subject = None):
    certificate_template = Image.open(
        'certificates/template_data/template1.png')
    draw = ImageDraw.Draw(certificate_template)
    font = ImageFont.truetype(
        'certificates/template_data/fonts/Oswald-Regular.ttf', size=90)

    # Customize the certificate content based on student data
    start_x = 300
    start_y = 700

    if not subject:
        subject = student.current_group.subject

    draw.text((start_x, start_y),
              f"Вручается за успехи ученику", font=font, fill='black')
    draw.text((start_x, start_y + 230),
              f"{student.first_name}    {student.last_name}", font=font, fill='black')
    draw.text((start_x, start_y + 460),
              f"По предмету: {subject.title}", font=font, fill='black')
    certificate_image_path = f'certificates/certificate_{student.id}_{subject.pk}_{datetime.now().strftime("%Y-%m-%d")}.png'
    certificate_image_path_full = os.path.join(
        settings.BASE_DIR, f'media/{certificate_image_path}')
    certificate_template.save(certificate_image_path_full)

    student_certificate = Certificate(
        student=student, subject=subject, image=certificate_image_path)
    student_certificate.save()
    return student_certificate
