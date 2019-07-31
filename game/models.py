from django.db import models

class Record(models.Model):
    player_name = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    ip = models.GenericIPAddressField(blank=True, null=True)
    is_playing = models.BooleanField(default=True)

    def __str__(self):
        return str(self.id) + ' : ' + self.player_name + ' ' + str(self.score)

class GameInfo(models.Model):
    info = models.TextField()

    def __str__(self):
        return self.info[:15]

class Question(models.Model):
    question = models.CharField(max_length=150)

    def __str__(self):
        return self.question

class Answer(models.Model):
    answer = models.CharField(max_length=50)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    is_correct = models.BooleanField()

    def __str__(self):
        return str(self.question.id) + ' : ' + self.answer

class SuggestQuestion(models.Model):
    question = models.CharField(max_length=150)

    def __str__(self):
        return self.question

class SuggestAnswer(models.Model):
    answer = models.CharField(max_length=50)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    is_correct = models.BooleanField()

    def __str__(self):
        return str(self.question.id) + ' : ' + self.answer

