from django import template
from network.models import *

register = template.Library()

@register.filter(name="liked")
def liked(username, post_id):
    user = User.objects.get(username=username)
    post = Post.objects.get(pk=post_id)
    return Likes.objects.filter(post=post, user=user)

register.filter("liked", liked)
