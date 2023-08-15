from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect

from .forms import LoginForm
from .get_context_processors import *
# Create your views here.


@login_required
def dashboard_index(request):
    return render(request, 'dashboard/index.html', get_context(segment='dashboard:index'))


@login_required
def dashboard_profile(request):
    user_groups = request.user.groups.all()
    return render(request, 'dashboard/profile.html', get_context(segment='dashboard:profile', context={'user_groups': user_groups}),)


def dashboard_login(request):
    form = LoginForm(request.POST or None)
    msg = None
    if request.method == "POST":
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse('dashboard:index'))
            else:
                msg = 'Invalid credentials'
        else:
            msg = 'Error validating the form'
    return render(request, "dashboard/accounts/login.html", {"form": form, "msg": msg})
