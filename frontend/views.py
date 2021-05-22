from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import IntegrityError
from backend.models import User
from django.core.mail import send_mail
from project.settings import EMAIL_HOST_USER
from backend.models import NewsletterUser


def index(request):
    return render(request, 'index.html')


def personal_profile(request):
    return render(request, 'personal_profile.html')


def reset(request):
    return render(request,'password_reset_form.html')


def login(request):
    if request.method == "GET":
        return redirect("/account/login/")

    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)

    if user is not None:
        auth_login(request, user)
        return redirect("/index")
    else:
        return render(request, "_wizard_forms.html", {"login_false": True})


def logout(request):
    auth_logout(request)
    return redirect("/index")


def register(request):
    try:
        if request.method == "POST":
            username = request.POST["username"]
            password = request.POST["password"]
            email = request.POST["email"]
            newsletter = request.POST["news_signup"]

            if username == "" or password == "" or email == "":
                messages.info(request, "Some fields are missing")
                return redirect("/login")
            else:
                user = User.objects.create_user(username, email, password)
                user.is_active = True
                user.save()

                messages.info(request, "registration was successful, you can now login")

                new_user = authenticate(request, username=username, password=password)
                auth_login(request, new_user)
                if newsletter == "on":
                    u = request.user
                    new_user = NewsletterUser(email=u.email)
                    new_user.save()

            return redirect("account/two_factor/setup/")
        else:
            return render(request, "register.html")
    except IntegrityError:

        return render(request, "_wizard_forms.html", {"username_taken": True})


def infos(request):
    current_user = request.user

    context = {
        "gender": current_user.gender,
        "age": current_user.age,
        "heart_disease": current_user.heart_disease,
        "high_blood_pressure": current_user.high_blood_pressure,
        "tobacco_use": current_user.tobacco_use,
        "diab_education": current_user.diab_education
    }
    return render(request, "information.html", context=context)


def admin_page(request):
    if request.user.is_superuser:
        if request.method == "POST":
            emailadresses_string = request.POST.get("emailadresses")
            email_text = request.POST.get("mailtext")
            subject = request.POST.get("subject")
            emailadresses_list = emailadresses_string.split(";")

            send_mail(subject, email_text, EMAIL_HOST_USER, emailadresses_list)

            return render(request, "mail_sent.html")
        return render(request, "admin_page.html")
    return redirect("/index")
