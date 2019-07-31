from django.shortcuts import render
from django.http import QueryDict, Http404
from django.db.models import F
from rest_framework.generics import GenericAPIView
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
                serializer = self.serializer_class(record, data={'player_name' : request.data.get('player_name'), 'ip' : ip, 'is_playing' : True})
                if serializer.is_valid():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class PutRecordView(GenericAPIView):
    queryset = models.Record.objects.all()
    serializer_class = serializers.RecordSerializer

    def get_object(id):
        try:
            return models.Record.objects.get(id=id)
        except models.Record.DoesNotExist:
            return Http404

    def put(self, request, id):
        record = self.get_object(id)
        data = {
            'player_name' : record.player_name, 
            'ip' : record.ip, 
            'score' : request.data.score
        }

        if record.is_playing:
            data['is_playing'] = False
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
    


