from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
import time
import random
import string
import hashlib
import os


class AssessmentHistory(models.Model):
    user = models.ForeignKey(User, related_name="assessment_history", on_delete=models.CASCADE)
    age = models.IntegerField(null=False)
    gender = models.IntegerField(null=False)
    pressure = models.IntegerField(null=False)
    disease = models.IntegerField(null=False)
    tobacco = models.IntegerField(null=False)
    education = models.IntegerField(null=False)
    score = models.IntegerField(null=False, default=0)
    degree = models.CharField(null=False, max_length=15)
    knowledge = models.CharField(null=False, max_length=10)
    food = models.CharField(null=False, max_length=10)
    sugar = models.CharField(null=False, max_length=10)
    exercise = models.CharField(null=False, max_length=10)
    prediction = models.CharField(null=False, max_length=10)
    assess_date = models.DateField(default=now)

    class Meta:
        unique_together = [["user",
                            "age",
                            "gender",
                            "pressure",
                            "disease",
                            "tobacco",
                            "education",
                            "score",
                            "degree",
                            "knowledge",
                            "food",
                            "sugar",
                            "exercise",
                            "prediction"
                            ]]


class NewsletterUserManager(models.Manager):
    def create_newsletter_user(self, username, email):
        newsletter_user = self.create(username=username, email=email)
        return newsletter_user


class PasswordChangeRequest(models.Model):
    user = models.ForeignKey(User, related_name="password_request", on_delete=models.CASCADE)
    UserID = models.CharField(default="", max_length=150)
    start_time = models.IntegerField(default=int(time.time()))
    end_time = models.IntegerField(default=int(time.time())+600)
    salt = models.CharField(default="", max_length=100)

    class Meta:
        unique_together = [["id","UserID","start_time","end_time"]]


class NewsletterUser(models.Model):
    username = models.CharField(default="old", max_length=100)
    email = models.EmailField()
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.email
