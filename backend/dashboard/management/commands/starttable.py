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
    help = 'Create files: views.py, urls.py, serializers.py, filters.py'

    def get_seprated_models(name):
        return name.split('.')

    def add_arguments(self, parser):
        parser.add_argument('folder_name', type=str, help='Name of the folder')
        parser.add_argument('model_name', type=str, help='Name of the model')
        parser.add_argument('app_name', type=str,
                            help='Name of the app', default='dashboard'),

    def handle(self, *args, **options):
        app_name = options['app_name']
        folder_name = options['folder_name']
        model_name: str = options['model_name']
        model_appname = None
        if '.' in model_name:
            model_appname, model_name = self.get_seprated_models(model_name)

        data_to_replace = {
            '{verbal_url_name}': model_name.lower(),
            '{ModelName}': model_name,
            '{app_name}': folder_name,
        }

        os.makedirs(os.path.join(app_name, 'tables',
                    folder_name), exist_ok=True)

        file_names = ['filters.py', 'urls.py', 'serializers.py', 'views.py']
        for i in file_names:
            views_file_path = os.path.join(
                app_name, 'tables', folder_name, i)
            template_path = os.path.join(
                'dashboard', 'management', 'commands', 'stubs', i)
            replace_file_with_stubs(
                views_file_path, template_path, data_to_replace)

        data = []
        with open('dashboard/json/urls.json', 'r') as f:
            data = json.loads(f.read())

            found = False
            for index, i in enumerate(data):
                if i["url"] == f"api/s/{folder_name}/":
                    data[index] = i
                    data[index]["file"] = f'{app_name}.tables.{folder_name}.urls'
                    found = True
                    break
            if not found:
                data.append({
                    "url": f"api/s/{folder_name}/",
                    "file": f'{app_name}.tables.{folder_name}.urls',
                })
        with open('dashboard/json/urls.json', 'w') as f:
            f.write(json.dumps(data))
