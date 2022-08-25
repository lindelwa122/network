from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_post(value):
        if len(value) == 0:
            raise ValidationError(
                _("Length of post must be bigger than 0 characters.")
            )

class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(User, models.CASCADE, "post_user")
    content = models.TextField(max_length=2000, blank=False, validators=[validate_post])
    likes = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.user} posted: {self.content}"