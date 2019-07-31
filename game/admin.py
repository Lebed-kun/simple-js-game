from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Record)
admin.site.register(models.GameInfo)
admin.site.register(models.Question)
admin.site.register(models.Answer)
admin.site.register(models.SuggestQuestion)
admin.site.register(models.SuggestAnswer)