from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import *

urlpatterns = [
    path('',views.index, name='index' ),
    path('contact/', views.contact, name='contact'),
    path('privacy-policy/', views.privacy_policy, name='privacy_policy'),
    path('terms-conditions/', views.terms_conditions, name='terms_conditions'),
    path('publishers/', views.publishers, name='publishers'),
    path('ad-format/', views.ad_format, name='ad_format'),
    path('about-us/', views.about_us, name='about_us'),
    path('support/', views.support, name='support'),
    path('affiliate/', views.affiliate, name='affiliate'),
    path('faqs/', views.faqs, name='faqs'),
    path('profile/', views.profile, name='profile'),
    # Autentication Urls

    path('check-email/', views.check_email, name='check_email'),
    path('code-verification/', views.code_verification, name='code_verification'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('login/', views.user_login, name='user_login'),
    path('register/', views.user_register, name='user_register'),
    path('logout/', views.user_logout, name='user_logout'),

] 
