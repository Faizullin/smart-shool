# from pyapa import pyapa
from .models import FileModel
from docx import Document


class FileChecker:
    def __init__(self):
        self.doc = None
        self.content = None
        self.errors = {}
        self.error_labels = {}
        self.init_errors()

    def init_errors(self):
        self.errors = {
            'abstract': [],
            'introduction': [],
            'discussion': [],
            'conclusion': [],
            'reference_list': [],
        }
        self.error_labels = {
            'abstract': "Abstract",
            'introduction': "Introduction",
            'discussion': 'Discussion',
            'conclusion': 'Conclusion',
            'reference_list': 'Reference List',
        }

    def validate_doc_title(self, content, key, label):
        is_found = False
        for p in self.doc.paragraphs:
            style = p.style
            if style is not None:
                if style.name == 'Heading 1' and p.text.strip() == label:
                    is_found = True
                    font_size = style.font.size.pt if style.font.size is not None else None
                    if font_size is None:
                        self.errors[key].append(
                            'Size pt error since it is None')
                    elif font_size != 20:
                        self.errors[key].append(
                            f'Size pt error: Your size pt={font_size}. Font size should be 20')
        if not is_found:
            self.errors[key].append(f"Label {label} is not found in document")
        return len(self.errors[key]) == 0, self.errors[key]

    def read_dox_file(self, filename: str):
        try:
            self.doc = Document(filename)
            return True, None
        except Exception as error:
            return False, error

    def validate_docx_file(self):
        steps = [
            {
                'method': self.validate_doc_title,
                'args': [self.content, 'introduction', 'Introduction']
            },
            {
                'method': self.validate_doc_title,
                'args': [self.content, 'conclusion', 'Conclusion']
            },
            {
                'method': self.validate_doc_title,
                'args': [self.content, 'reference_list', 'Reference List']
            },
            # {
            #     'method': self.validate_apa_style,
            #     'args': [self.content]
            # },
        ]
        for step in steps:
            step['method'](*step['args'])

    def get_errors(self):
        data = []
        for key in self.errors.keys():
            error_label = self.error_labels[key]
            data.append({
                'messages': self.errors[key],
                'field': key,
                'label': error_label,
            })
        return data
