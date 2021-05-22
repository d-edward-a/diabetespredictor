"""predictor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from backend import views

urlpatterns = [
    path('', views.index_page),
    path('predict', views.predict_diabetic_type),
    path('save_data', views.save_data),
    path('history', views.display_history),
    path('delete_selected', views.delete_selected),
    path('delete_all', views.delete_all),
    path('user_data', views.user_details),
    path('subscription_data', views.subscription_details),
    path('check_user', views.check_user),
    path('change_email',views.change_mail),
    path('change_username', views.change_username),
    path('delete_user', views.delete_account),
    path('subscribe_newsletter', views.subscribe_newsletter),
    path('unsubscribe_newsletter', views.unsubscribe_newsletter),
    path('get_newsletter_user', views.get_newsletter_user),
    path('validate_username', views.validate_username),
    path('validate_email', views.validate_email),
    path('reset_password', views.reset_password),
    path('send_reset_email',views.send_reset_email)
]
