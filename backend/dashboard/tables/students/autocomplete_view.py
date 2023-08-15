from django.http import JsonResponse
# from utils.helpers import is_ajax
from accounts.models import User


def user_autocomplete(request):
    if is_ajax(request):
        query = request.GET.get('q', '')
        queryset = User.objects.filter(email__icontains=query)
        results = [{'id': obj.id, 'text': str(obj)} for obj in queryset]
        return JsonResponse(results, safe=False)
