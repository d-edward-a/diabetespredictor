"""
WSGI config for predictor project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/home/ubuntu/diabetespredictor')
sys.path.append('/home/ubuntu/diabetespredictor/venv/lib/python3.8/site-packages')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SEF.settings')

application = get_wsgi_application()
