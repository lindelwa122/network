from django import template
from network.models import *

register = template.Library()

@register.filter(name="liked")
def liked(username, post_id):
    user = User.objects.get(username=username)
    post = Post.objects.get(pk=post_id)
    return Likes.objects.filter(post=post, user=user)

@register.filter(name="minus")
def minus(value1, value2):
    return value1 - value2

register.filter("liked", liked)
register.filter("minus", minus)
