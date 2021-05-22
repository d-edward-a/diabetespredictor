import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .predictor import *
import time
from .models import NewsletterUser
from .models import NewsletterUserManager
from django.conf import settings
from .models import PasswordChangeRequest
import hashlib
import os
from datetime import date
from .profile import *

import time


@api_view(['GET'])
def index_page(request):
    return_data = {
        "error": "0",
        "message": "Successful",
    }
    return Response(return_data)


@api_view(["POST"])
def save_data(request):
    try:
        if User.objects.filter(username=request.user).exists():
            save_assessment_data(request.user,
                             request.data['s_age'],
                             request.data['s_gender'],
                             request.data['s_pressure'],
                             request.data['s_disease'],
                             request.data['s_tobacco'],
                             request.data['s_education'],
                             request.data['s_degree'],
                             request.data['s_knowledge'],
                             request.data['s_food'],
                             request.data['s_sugar'],
                             request.data['s_exercise'],
                             request.data['s_prediction'],
                             request.data['s_confidence'])
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
def predict_diabetic_type(request):
    try:
        predictions = process_assessment(request)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return predictions


@api_view(["GET"])
def display_history(request):
    try:
        assessments = get_assessments(request.user)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(assessments)


@api_view(["DELETE"])
def delete_selected(request):
    try:
        if User.objects.filter(username=request.user).exists():
            del_selected_items(request)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
def delete_all(request):
    try:
        if User.objects.filter(username=request.user).exists():
            del_all_items(request.user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["GET"])
def user_details(request):
    try:
        user = get_user_details(request.user)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(user)


@api_view(["GET"])
def subscription_details(request):
    try:
        signed_up = get_subscription_details(request)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(signed_up)


@api_view(["POST"])
def change_mail(request):
    try:
        if User.objects.filter(email=request.data["new_mail"]).exists():
            return Response(status=status.HTTP_302_FOUND)
        else:
            confirm_change_email(request)
            return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def change_username(request):
    try:
        if str(request.user) == request.data["new_username"]:
            return Response(status=status.HTTP_226_IM_USED)
        else:
            if User.objects.filter(username=request.data['new_username']).exists():
                return Response(status=status.HTTP_302_FOUND)
            else:
                confirm_change_username(request)
                return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def send_reset_email(request):
    try:
        if User.objects.filter(email=request.data["mail"]).exists():
            send_reset(request, request.data["mail"])
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def check_user(request):
    try:
        if User.objects.filter(username=request.user).exists():
            authenticate_user(request)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
def reset_password(request):
    try:
        print(request.data)
        query = request.data["queryString"]
        hashed_id = query #hashed_id and salt

        requester = PasswordChangeRequest.objects.get(UserID=hashed_id)
        requesters_salt = requester.salt
        req_id = str(requester.id)
        requesters_hashed_id = hashlib.sha256(requesters_salt.encode() + req_id.encode()).hexdigest()

        concat = requesters_hashed_id + ":" + requesters_salt
        end_time = requester.end_time
        now_time = int(time.time())

        if hashed_id == concat and end_time > now_time:
            u = User.objects.get(id=requester.id)
            u.set_password(request.data["new_password"])
            u.save()
            requester.delete()

            update_session_auth_hash(request, u)

            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_301_MOVED_PERMANENTLY)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
def delete_account(request):
    try:
        if User.objects.filter(username=request.user).exists():
            delete_user(request)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_newsletter_user(request):
    try:
        newsletter_getters = newsletter_emails()
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(json.dumps(newsletter_getters))


@api_view(["POST"])
def subscribe_newsletter(request):
    try:
        if NewsletterUser.objects.filter(email=request.data["mail"]).exists():
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        else:
            new_user = NewsletterUser(email=request.data["mail"], username=User.objects.get(email=request.data["mail"]))
            new_user.save()
            return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
def unsubscribe_newsletter(request):
    try:
        if NewsletterUser.objects.filter(email=request.data["mail"]).exists():
            user_to_delete = NewsletterUser.objects.get(email=request.data["mail"])
            user_to_delete.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_302_FOUND)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def validate_username(request):
    try:
        if User.objects.filter(username=request.data['v_user']).exists():
            return Response(status=status.HTTP_302_FOUND)
        else:
            return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def validate_email(request):
    try:
        if User.objects.filter(email=request.data['v_email']).exists():
            return Response(status=status.HTTP_302_FOUND)
        else:
            return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("Ups, something went wrong: " + str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
