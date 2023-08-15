from tinymce.widgets import TinyMCE
from django import forms
# from django.contrib.flatpages.models import FlatPage
from .models import Article


class ArticleDashboardCreateForm(forms.ModelForm):
    content = forms.CharField(widget=TinyMCE(attrs={'cols': 80, 'rows': 30}))

    class Meta:
        model = Article
        fields = ['title', 'content', 'featured_image',]


class ArticleDashboardUpdateForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content', 'featured_image',]
