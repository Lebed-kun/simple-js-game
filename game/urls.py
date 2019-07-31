from django.urls import path

from . import views

urlpatterns = [
    path('info/', views.GameInfoView.as_view()),
    path('new_player/', views.NewPlayerView.as_view()),
    path('random/', views.RandomQuestionView.as_view()),
    path('check_answer/<id>/', views.CheckAnswerView.as_view()),
    path('put_record/<id>/', views.PutRecordView.as_view()),
    path('records/', views.RecordsView.as_view()),
]