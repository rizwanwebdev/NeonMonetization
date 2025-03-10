from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from datetime import datetime
from .models import UserBalance, Withdraw



@login_required(login_url='user_login')
def dashboard(request):
    user_balance, created = UserBalance.objects.get_or_create(user=request.user)

    # ✅ Get user's withdraw records in descending order
    user_withdraws = Withdraw.objects.filter(user=request.user).order_by('-id')

    # ✅ Get today's date
    today_date = datetime.now().strftime("%B %d, %Y")

    return render(request, 'dashboard.html', {
        'user_balance': user_balance,
        'user_withdraws': user_withdraws,  # ✅ Send ordered withdraw data
        'today_date': today_date
    })



