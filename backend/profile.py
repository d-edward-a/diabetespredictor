from django.contrib.auth import authenticate, update_session_auth_hash
from .models import User, AssessmentHistory, NewsletterUser, PasswordChangeRequest
from django.core import serializers
import random
import math
import pickle
import numpy as np
from .predictor import dummy_results
import uuid
import hashlib
import time
from datetime import date
import json
from django.core.mail import send_mail


def authenticate_user(request):
    user = request.user
    confirmed = authenticate(username=user, password=request.data["old_password"])

    if confirmed is not None:
        u = User.objects.get(username=user)
        u.set_password(request.data["new_password"])
        u.save()
        update_session_auth_hash(request, u)


def get_user_details(user_id):
    user = user_id
    id = User.objects.get(id=user.id)

    if user.is_authenticated:
        details = User.objects.filter(username=id)
        serialized_user = serializers.serialize('json', details)

        return serialized_user

def confirm_change_username(request):
    user = request.user

    u = User.objects.get(username=user)
    u.username = request.data["new_username"]
    u.save()

    update_session_auth_hash(request, u)

def confirm_change_email(request):
    user = request.user
    u = User.objects.get(username=user)
    old_mail = request.data["old_mail"]
    if NewsletterUser.objects.filter(email=old_mail).exists():
        user_to_delete = NewsletterUser.objects.get(email=old_mail)
        user_to_delete.delete()
        new_mail = request.data["new_mail"]
        new_user = NewsletterUser(email=new_mail)
        new_user.email = new_mail
        new_user.save()
    u.email = request.data["new_mail"]
    u.save()
    update_session_auth_hash(request, u)

def delete_user(request):
    user = request.user

    u = User.objects.get(username=user)
    u.delete()


def save_assessment_data(user_id,
                         s_age,
                         s_gender,
                         s_pressure,
                         s_disease,
                         s_tobacco,
                         s_education,
                         s_degree,
                         s_knowledge,
                         s_food,
                         s_sugar,
                         s_exercise,
                         s_prediction,
                         s_confidence):
    user = user_id
    ID = User.objects.get(id=user.id)

    if user.is_authenticated:
        new_entry = AssessmentHistory(user=ID,
                                      age=s_age,
                                      gender=s_gender,
                                      pressure=s_pressure,
                                      disease=s_disease,
                                      tobacco=s_tobacco,
                                      education=s_education,
                                      degree=s_degree,
                                      knowledge=s_knowledge,
                                      food=s_food,
                                      sugar=s_sugar,
                                      exercise=s_exercise,
                                      prediction=s_prediction,
                                      score=s_confidence)
        new_entry.save()


def get_assessments(user_id):
    user = user_id
    all_entries = {}
    if user.is_authenticated:
        for entry in user.assessment_history.all():
            entry_dict = {}
            entry_date = entry.assess_date

            form_date = entry_date.strftime("%d %b %Y")  # e.g. 29 April 2021
            entry_dict["date"] = form_date
            entry_dict["age"] = entry.age
            entry_dict["pressure"] = entry.pressure
            entry_dict["disease"] = entry.disease
            entry_dict["tobacco"] = entry.tobacco
            entry_dict["education"] = entry.education
            entry_dict["degree"] = entry.degree
            entry_dict["knowledge"] = entry.knowledge
            entry_dict["food"] = entry.food
            entry_dict["sugar"] = entry.sugar
            entry_dict["exercise"] = entry.exercise
            entry_dict["prediction"] = entry.prediction
            entry_dict["score"] = entry.score

            all_entries[entry.id] = entry_dict
    return all_entries


def del_selected_items(request):
    user_id = request.user

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    items = body["items"]

    user = user_id
    id = User.objects.get(id=user.id)

    if user.is_authenticated:
        for item in items:
            AssessmentHistory.objects.filter(id=item, user_id=id).delete()


def del_all_items(user_id):
    user = user_id
    id = User.objects.get(id=user.id)

    if user.is_authenticated:
        AssessmentHistory.objects.filter(user_id=id).delete()


def get_subscription_details(request):
    signed_up = False

    user = request.user
    u = User.objects.get(username=user)
    if NewsletterUser.objects.filter(email=u.email).exists():
        signed_up = True

    return signed_up

def send_reset(request, mail):
    u = User.objects.get(email=mail)
    u_id = str(u.id)
    salt = uuid.uuid4().hex
    hashed_id = hashlib.sha256(salt.encode() + u_id.encode()).hexdigest() + ':' + salt

    now = int(time.time())
    expiry = int(time.time() + 600)

    if PasswordChangeRequest.objects.filter(id=u.id).exists():
        req = PasswordChangeRequest.objects.get(id=u.id)
        req.start_time = now
        req.end_time = expiry
        req.UserID = hashed_id
        req.salt = salt
        req.save()
    else:
        requester = PasswordChangeRequest(user=u,
                                          id=u.id,
                                          UserID=hashed_id,
                                          salt=salt,
                                          start_time=now,
                                          end_time=expiry)
        requester.save()

    url_id = str(hashed_id)

    send_mail(
        'Reset Password',
        'You are receiving this email because you requested a password reset for your user account at ' + request.get_host() + '.\n\
                            Please go to the following page and choose a new password:\n\
                            Your username , in case you’ve forgotten: ' + u.username + '\n'
        'https://'+ request.get_host() + '/reset?ID=' + url_id + '\n\
                            Thanks for using our site!\n\
                            The DP team',
        'diabetespredictor@gmail.com',
        [mail],
        fail_silently=False,
    )




def days_between(d1, d2):
    return abs((d2 - d1).days)





def newsletter_emails():
    all_users = User.objects.all()
    all_newsletter_user_query = NewsletterUser.objects.all().values_list("email", flat=True)
    all_newsletter_user_list = list(all_newsletter_user_query)
    print(all_newsletter_user_list)
    newsletter_getters = []

    for user in all_users:
        if user.email in all_newsletter_user_list:
            history = AssessmentHistory.objects.filter(user=user)
            history_list = list(history)

            if history_list:
                last_history_element = history_list[-1]
                date_today = date.today()
                asses_date = last_history_element.assess_date

                if days_between(asses_date, date_today) >= -1:
                    newsletter_getters.append(user.email)

    return newsletter_getters