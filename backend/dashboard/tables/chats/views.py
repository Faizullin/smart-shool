from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from chats.models import ChatRoom

from .forms import ChatForm
from .tables import ChatTable, ChatFilter


class ChatListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = ChatRoom
    table_class = ChatTable
    template_name = 'dashboard/tables/chats/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = ChatFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:chat_list')
        context.update({
            "filterset": ChatFilter(self.request.GET, queryset=self.get_queryset()),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return ChatRoom.objects.all()


@login_required()
def chat_create(request):
    if request.method == 'POST':
        form = ChatForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chat_create')}))
    else:
        form = ChatForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chat_create')})


@login_required()
def chat_edit(request, pk):
    chat = get_object_or_404(ChatRoom, pk=pk)
    if request.method == 'POST':
        form = ChatForm(request.POST, instance=chat)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chat_edit', kwargs={'pk': chat.pk})}))
    else:
        form = ChatForm(instance=chat)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chat_edit', kwargs={'pk': chat.pk})})


@login_required
def chat_delete(request, pk):
    chat = get_object_or_404(ChatRoom, pk=pk)
    if request.method == 'POST':
        chat.delete()
        return redirect('dashboard:chat_list')
    raise Http404


@login_required
def chat_start(request):
    return ''
