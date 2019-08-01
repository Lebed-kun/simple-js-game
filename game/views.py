from django.shortcuts import render
from django.http import QueryDict, Http404
from django.db.models import Q
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
        non_empty = self.get_queryset().count() > 0
        obj = self.get_queryset()[0] if non_empty else None
        return Response({'info' : obj.info if non_empty else ''}, status=status.HTTP_200_OK) 

class NewPlayerView(GenericAPIView):
    queryset = models.Record.objects.all()
    serializer_class = serializers.RecordSerializer

    def post(self, request):
        ip = get_client_ip(request)
        queryset = self.get_queryset().filter(ip=ip)

        if len(queryset) == 0:
            serializer = self.serializer_class(data={'player_name' : request.data.get('player_name'), 'ip' : ip})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            record = queryset[0]
            data = {
                'player_name' : request.data.get('player_name'), 
                'ip' : ip, 
                'is_playing' : True,
                'score' : record.score,
            }
            serializer = self.serializer_class(record, data=data)
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
            'answers' : [{'id' : answer.id, 'answer' : answer.answer, 'question_id' : answer.question.id} for answer in answers]
        }
        return Response(data, status=status.HTTP_200_OK)

class CheckAnswerView(GenericAPIView):
    queryset = models.Answer.objects.all()

    def get_object(self, id):
        try:
            return models.Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            raise Http404

    def get(self, request, id):
        answer = self.get_object(id)
        if (answer.is_correct):
            return Response({'is_correct' : True}, status=status.HTTP_200_OK)
        else:
            correct_answer = self.get_queryset().filter(Q(question=answer.question) & Q(is_correct=True))[0]
            return Response({'is_correct' : False, 'correct_answer_id' : correct_answer.id})

class PutRecordView(GenericAPIView):
    queryset = models.Record.objects.all()
    serializer_class = serializers.RecordSerializer

    def get_object(self, id):
        try:
            return models.Record.objects.get(id=id)
        except models.Record.DoesNotExist:
            return Http404

    def put(self, request, id):
        record = self.get_object(id)
        data = {
            'player_name' : record.player_name, 
            'ip' : record.ip
        }

        if record.is_playing:
            data['is_playing'] = False
            
            if int(request.data.get('score')) > record.score:
                data['score'] = int(request.data.get('score'))
            else:
                data['score'] = record.score

            serializer = self.serializer_class(record, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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

class NewSuggestionView(GenericAPIView):
    serializer_class = serializers.SuggestQuestionSerializer
    
    def post(self, request):
        data = {}

        question = request.data.get('question')
        QuestionSerializer = serializers.SuggestQuestionSerializer(data={'question' : question})

        if QuestionSerializer.is_valid():
            QuestionSerializer.save()
            data['question'] = QuestionSerializer.data
        else:
            return Response(QuestionSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data['answers'] = []
        answers = request.data.get('answers')
        question_id = QuestionSerializer.data.get('id')
        for answer in answers:
            answer_data = {'answer' : answer['answer'], 'question_id' : question_id, 'is_correct' : answer['is_correct']}
            AnswerSerializer = serializers.SuggestAnswerSerializer(data=answer_data)
            if AnswerSerializer.is_valid():
                AnswerSerializer.save()
                answer_data['id'] = AnswerSerializer.data.get('id')
                data['answers'].append(answer_data)
            else:
                return Response(AnswerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(data, status=status.HTTP_201_CREATED)


        
    


