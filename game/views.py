from django.shortcuts import render
from django.db.models import F
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    GenericAPIView,
)
from random import randint
from rest_framework.response import Response
from rest_framework import status

from .utils import get_client_ip
from . import models
from . import serializers

class RandomQuestionView(GenericAPIView):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer

    def get(self, request):
        queryset = self.get_queryset()
        count = queryset.count()
        question = queryset[randint(0, count - 1)]
        answers = models.Answer.objects.filter(question=question)
        
        data = {
            'questtion' : question.question,
            'answers' : [{'answer' : answer.answer, 'question_id' : answer.question.id} for answer in answers]
        }
        return Response(data, status=status.HTTP_200_OK)


