
from django import forms
from articles.models import Article
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class ArticleForm(forms.ModelForm):
    featured_image = forms.ImageField(required=True)
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Article
        fields = ['title', 'featured_image', 'subject',
                  'content', 'force_highlighted', 'status', 'file',]
