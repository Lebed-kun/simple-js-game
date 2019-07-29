from rest_framework import serializers
from . import models

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Record
        fields = ('id', 'player_name', 'score', 'ip', 'is_playing')

class GameInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GameInfo
        fields = ('info',)

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = ('id', 'question')

class AnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField(source='question.id', read_only=True)
    
    class Meta:
        model = models.Answer
        fields = ('id', 'answer', 'question_id', 'is_correct')
