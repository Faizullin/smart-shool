from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView 

from dashboard.get_context_processors import get_context
from chats.models import ChatMessage

from .forms import ChatMessageForm
from .tables import ChatMessageTable, ChatMessageFilter

class ChatMessageListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = ChatMessage
    table_class = ChatMessageTable
    template_name = 'dashboard/tables/chat_messages/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = ChatMessageFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(context=context, segment='dashboard:chatmessage_list')
        context.update({
            "filterset": ChatMessageFilter(self.request.GET, queryset = self.get_queryset()),
        })
        return context
    
    def get_queryset(self, *args, **kwargs):
        return ChatMessage.objects.all()

@login_required()
def chatmessage_create(request):
    if request.method == 'POST':
        form = ChatMessageForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form , 'edit_url': reverse('dashboard:chatmessage_create') }))
    else:
        form = ChatMessageForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form,'edit_url': reverse('dashboard:chatmessage_create')})

@login_required()
def chatmessage_edit(request, pk):
    chatmessage = get_object_or_404(ChatMessage, pk=pk)
    if request.method == 'POST':
        form = ChatMessageForm(request.POST, instance=chatmessage)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chatmessage_edit', kwargs={'pk': chatmessage.pk}) }))
    else:
        form = ChatMessageForm(instance=chatmessage)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:chatmessage_edit', kwargs={'pk': chatmessage.pk}) })

@login_required
def chatmessage_delete(request, pk):
    chatmessage = get_object_or_404(ChatMessage, pk=pk)
    if request.method == 'POST':
        chatmessage.delete()
        return redirect('dashboard:chatmessage_list')
    raise Http404