from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


def index(request):
    return render(request, 'index.html')

def contact(request):
    return render(request, 'pages/contact.html')

def privacy_policy(request):
    return render(request, 'pages/privacy_policy.html')

def terms_conditions(request):
    return render(request, 'pages/terms_conditions.html')

def publishers(request):
    return render(request, 'pages/publishers.html')

def ad_format(request):
    return render(request, 'pages/ad_format.html')

def about_us(request):
    return render(request, 'pages/about_us.html')

def support(request):
    return render(request, 'pages/support.html')

def affiliate(request):
    return render(request, 'pages/affiliate.html')

def faqs(request):
    return render(request, 'pages/faqs.html')

# Autentication Fields Start Below

def check_email(request):
    return render(request, 'auth/check_email.html')

def code_verification(request):
    return render(request, 'auth/code_verification.html')

def forgot_password(request):
    return render(request, 'auth/forgot_password.html')

def reset_password(request):
    return render(request, 'auth/reset_password.html')

def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            return redirect('user_register')
        
    success_message = None

    if request.session.get('registration_success'):
        success_message = "Account created successfully! You can now log in."
        del request.session['registration_success']  # Remove the flag after displaying message

    return render(request, 'auth/login.html', {'success_message': success_message})
    


def user_register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists. Please choose another one.")
        elif len(password1) < 8:
            messages.error(request, "Password must be at least 8 characters long.")
        elif password1 != password2:
            messages.error(request, "Passwords do not match.")
        else:
            my_user = User.objects.create_user(username=username, email=email, password=password1)
            my_user.save()
            request.session['registration_success'] = True  # Store flag in session
            return redirect('user_login')  # Redirect to login page

    return render(request, 'auth/register.html')



@login_required(login_url='user_login')
def user_logout(request):
    logout(request)
    return redirect('index')

@login_required(login_url='user_login')
def profile(request):
    return render(request, 'pages/profile.html')
