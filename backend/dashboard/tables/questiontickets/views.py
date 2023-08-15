from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
import django_tables2 as tables
from django_filters.views import FilterView

from dashboard.get_context_processors import get_context
from chat.models import QuestionTicket, ChatMessage

from .forms import QuestionTicketForm
from .tables import QuestionTicketTable, QuestionTicketFilter


from chat.operations import send_ws_message
from chat.serializers import ChatSendMessageSerializer


class QuestionTicketListView(LoginRequiredMixin, tables.SingleTableMixin, FilterView):
    model = QuestionTicket
    table_class = QuestionTicketTable
    template_name = 'dashboard/tables/questiontickets/index.html'
    paginator_class = tables.LazyPaginator
    filterset_class = QuestionTicketFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context = get_context(
            context=context, segment='dashboard:questionticket_list')
        context.update({
            "filterset": QuestionTicketFilter(),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        return QuestionTicket.objects.all()


@login_required()
def questionticket_create(request):
    if request.method == 'POST':
        form = QuestionTicketForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:questionticket_create')}))
    else:
        form = QuestionTicketForm()
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:questionticket_create')})


@login_required()
def questionticket_edit(request, pk):
    questionticket = get_object_or_404(QuestionTicket, pk=pk)
    if request.method == 'POST':
        form = QuestionTicketForm(request.POST, instance=questionticket)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        return HttpResponseBadRequest(render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:questionticket_edit', kwargs={'pk': questionticket.pk})}))
    else:
        form = QuestionTicketForm(instance=questionticket)
    return render(request, 'dashboard/tables/form_base.html', {'form': form, 'edit_url': reverse('dashboard:questionticket_edit', kwargs={'pk': questionticket.pk})})


@login_required
def questionticket_delete(request, pk):
    questionticket = get_object_or_404(QuestionTicket, pk=pk)
    if request.method == 'POST':
        questionticket.delete()
        return redirect('dashboard:questionticket_list')
    raise Http404


@login_required
def questionticket_respond(request, pk):
    questionticket = get_object_or_404(QuestionTicket, pk=pk)
    questionticket.status = 'c'
    questionticket.save()
    send_message = 'This is answer for your question. Please do not resply!. \n' + \
        questionticket.msg

    chatMessage = ChatMessage.objects.create(
        lang=questionticket.requested_chat_message.lang,
        chat_room=questionticket.requested_chat_message.chat_room,
        msg=send_message,
        owner=request.user,
        recipient=questionticket.requested_chat_message.owner,
        type='r'
    )

    try:
        send_ws_message(
            ChatSendMessageSerializer(chatMessage).data,
            questionticket.requested_chat_message.chat_room,
        )
        messages.success(request, 'Ticket sent successfully!')
    except Exception as err:
        messages.error(request, 'Error: ' + str(err))

    return redirect(request.META.get('HTTP_REFERER'))
