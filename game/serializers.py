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

class SuggestQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SuggestQuestion
        fields = ('id', 'question')

class SuggestAnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField(source='question.id')
    
    class Meta:
        model = models.SuggestAnswer
        fields = ('id', 'answer', 'question_id', 'is_correct')

    def create(self, validated_data):
        print(validated_data)
        question = models.SuggestQuestion.objects.get(id=validated_data['question']['id'])
        answer = models.SuggestAnswer.objects.create(answer=validated_data['answer'], question=question, is_correct=validated_data['is_correct'])
        return answer
