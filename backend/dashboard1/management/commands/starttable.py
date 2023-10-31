import os
import json
from django.core.management.base import BaseCommand


def replace_stubs(text: str, data: dict):
    for key, value in data.items():
        text = text.replace(key, value)
    return text


def replace_file_with_stubs(slodo_file_path: str, template_path: str, data: dict):
    template_data = ''
    with open(template_path, 'r') as slodo_file:
        template_data = slodo_file.read()
    with open(slodo_file_path, 'w') as slodo_file:
        slodo_file.write(replace_stubs(template_data, data))


class Command(BaseCommand):
    help = 'Create files: views.py, urls.py, tables.py, forms.py, and an HTML template'

    def add_arguments(self, parser):
        parser.add_argument('folder_name', type=str, help='Name of the folder')
        parser.add_argument('model_name', type=str, help='Name of the model')
        parser.add_argument('app_name', type=str,
                            help='Name of the app', default='dashboard'),
        parser.add_argument(
            'slodo_name', type=str, help='Name of the slodo HTML file', default='index.html')

    def handle(self, *args, **options):
        app_name = options['app_name']
        folder_name = options['folder_name']
        slodo_name = options['slodo_name']
        model_name: str = options['model_name']

        data_to_replace = {
            '{verbal_url_name}': model_name.lower(),
            '{ModelName}': model_name,
            '{app_name}': folder_name,
            '{slodo_name}': slodo_name,
        }

        # Create the folder if it doesn't exist

        os.makedirs(os.path.join(app_name, 'templates', app_name,
                    'tables', folder_name), exist_ok=True)
        os.makedirs(os.path.join(app_name, 'tables',
                    folder_name), exist_ok=True)

        # Create the slodo HTML file
        slodo_file_path = os.path.join(os.path.join(
            app_name, 'templates', app_name, 'tables', folder_name), slodo_name)
        template_path = os.path.join(
            'dashboard', 'management', 'commands', 'stubs', 'templates', 'index.html')
        replace_file_with_stubs(
            slodo_file_path, template_path, data_to_replace)

        # Create the views.py file
        views_file_path = os.path.join(
            app_name, 'tables', folder_name, 'views.py')
        template_path = os.path.join(
            'dashboard', 'management', 'commands', 'stubs', 'views.py')
        replace_file_with_stubs(
            views_file_path, template_path, data_to_replace)

        # Create the urls.py file
        views_file_path = os.path.join(
            app_name, 'tables', folder_name, 'urls.py')
        template_path = os.path.join(
            'dashboard', 'management', 'commands', 'stubs', 'urls.py')
        replace_file_with_stubs(
            views_file_path, template_path, data_to_replace)

        # Create the tables.py file
        views_file_path = os.path.join(
            app_name, 'tables', folder_name, 'tables.py')
        template_path = os.path.join(
            'dashboard', 'management', 'commands', 'stubs', 'tables.py')
        replace_file_with_stubs(
            views_file_path, template_path, data_to_replace)

        # Create the forms.py file
        views_file_path = os.path.join(
            app_name, 'tables', folder_name, 'forms.py')
        template_path = os.path.join(
            'dashboard', 'management', 'commands', 'stubs', 'forms.py')
        replace_file_with_stubs(
            views_file_path, template_path, data_to_replace)

        data = []
        with open('dashboard/json/urls.json', 'r') as f:
            data = json.loads(f.read())
            data.append({
                "url": f"dashboard/{folder_name}/",
                "file": f'{app_name}.tables.{folder_name}.urls',
            })
        with open('dashboard/json/urls.json', 'w') as f:
            f.write(json.dumps(data))
        data = []
        with open('dashboard/json/segments.json', 'r') as f:
            data = json.loads(f.read())
            data.append(
                {
                    'label': model_name,
                    'active': False,
                    'link': f'dashboard:{model_name.lower()}_list',
                    'groups': [],
                },
            )
        with open('dashboard/json/segments.json', 'w') as f:
            f.write(json.dumps(data))
