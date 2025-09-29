from django.urls import path
from .views import (
    home, profile, index, game, 
    champ, player, CustomLoginView, 
    RegisterView, c_user_ok, public_profile,
    capture_face_view 
)

urlpatterns = [
    path('', index, name='index'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('game/', game, name='game'),
    path('champ/', champ, name='champ'),
    path('player/', player, name='player'),
    path('home/', home, name='home'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', profile, name='users-profile'),
    path('c_user_ok/', c_user_ok, name='c_user_ok'),
    path('profile/<str:username>/', public_profile, name='public-profile'),
    path('capture-face/', capture_face_view, name='capture_face'),
]