from django.shortcuts import render
from django.db.models import F
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView
    GenericAPIView,
)
from random import randint
from rest_framework.response import Response


from .utils import get_client_ip
from . import models
from . import serializers

class RandomQuestionView(GenericAPIView):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
