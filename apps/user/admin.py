from django.contrib import admin

from . import models

from django.contrib.auth import get_user_model
User = get_user_model()


admin.site.register(User)