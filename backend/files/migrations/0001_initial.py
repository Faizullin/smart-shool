# Generated by Django 4.2.6 on 2023-10-31 16:01

from django.db import migrations, models
import files.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to=files.models.file_directory_path)),
                ('extension', models.CharField(max_length=10)),
                ('size', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]