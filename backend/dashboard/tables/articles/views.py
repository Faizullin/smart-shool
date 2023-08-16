from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from articles.models import Article

from .forms import ArticleForm
from .tables import ArticleTable, ArticleFilter
from academics.models import Subject


class ArticleListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = Article
    table_class = ArticleTable
    template_name = 'dashboard/tables/articles/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = ArticleFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:article_list')
        context.update({
            'filterset': ArticleFilter(self.request.GET)
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return Article.objects.all()


@login_required()
def article_create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES,)
        if form.is_valid():
            form.save()
            return redirect(reverse('dashboard:article_list'))
    else:
        form = ArticleForm()
    context = {'form': form, 'edit_url': reverse(
        'dashboard:article_create'), 'subjects': Subject.objects.all()}
    context.update(get_context(context=context,
                   segment='dashboard:article_list'))
    return render(request, 'dashboard/tables/articles/form.html', context,)


@login_required()
def article_edit(request, pk):
    article = get_object_or_404(Article.objects, id=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES, instance=article)
        if form.is_valid():
            form.save()
            return redirect(reverse('dashboard:article_list'))
    else:
        form = ArticleForm(instance=article)
    print(article.featured_image)
    context = {'form': form, 'edit_url': reverse('dashboard:article_edit', kwargs={
                                                 'pk': article.pk}), 'subjects': Subject.objects.all(), 'article': article}
    context.update(get_context(context=context,
                   segment='dashboard:article_list'))
    return render(request, 'dashboard/tables/articles/form.html', context)


@login_required
def article_delete(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == 'POST':
        article.delete()
        return redirect('dashboard:article_list')
    raise Http404
