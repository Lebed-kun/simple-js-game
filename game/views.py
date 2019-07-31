from django.shortcuts import render
from django.http import QueryDict
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

TOP_PLAYERS = 10

class GameInfoView(GenericAPIView):
    queryset = models.GameInfo.objects.all()
    
    def get(self, request):
        obj = self.get_queryset()[0]
        return Response({'info' : obj.info}, status=status.HTTP_200_OK) 

class NewPlayerView(GenericAPIView):
    queryset = models.Record.objects.all()
    serializer_class = serializers.RecordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            ip = get_client_ip(request)
            queryset = self.get_queryset().filter(ip=ip)

            if len(queryset) == 0:
                serializer = self.serializer_class(data={'player_name' : request.data.get('player_name'), 'ip' : ip})
                if serializer.is_valid():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                record = queryset[0]
                serializer = self.serializer_class(record, data={'player_name' : request.data.get('player_name'), 'ip' : ip})
                if serializer.is_valid():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecordsView(GenericAPIView):
    queryset = models.Record.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        top_players = queryset.order_by('-score')[:TOP_PLAYERS]
        
        data = [{
            'player_name' : record.player_name,
            'score' : record.score
        } for record in top_players]
        
        return Response(data, status=status.HTTP_200_OK)
        
class RandomQuestionView(GenericAPIView):
    queryset = models.Question.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        count = queryset.count()
        question = queryset[randint(0, count - 1)]
        answers = models.Answer.objects.filter(question=question)
        
        data = {
            'question' : question.question,
            'answers' : [{'answer' : answer.answer, 'question_id' : answer.question.id} for answer in answers]
        }
        return Response(data, status=status.HTTP_200_OK)


