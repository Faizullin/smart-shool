from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from accounts.models import User

from .forms import UserForm
from .tables import UserTable, UserFilter

class UserListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = User
    table_class = UserTable
    template_name = 'dashboard/tables/users/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = UserFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:user_list')
        context.update({
            "filterset": UserFilter(self.request.GET),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return User.objects.all()

@login_required()
def user_create(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:user_create')}))
    else:
        form = UserForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:user_create')})

@login_required()
def user_edit(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        form = UserForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:user_edit', kwargs={'pk': user.pk})}))
    else:
        form = UserForm(instance=user)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:user_edit', kwargs={'pk': user.pk}) })

@login_required
def user_delete(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        user.delete()
        return redirect('dashboard:user_list')
    raise Http404