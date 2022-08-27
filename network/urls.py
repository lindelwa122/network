
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post/new", views.post, name="post"),
    path("post/like/<int:post_id>", views.likes, name="like_post")
]
