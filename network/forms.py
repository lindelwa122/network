from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ["user", "likes"]
        widgets = {
            "content": forms.Textarea(
                attrs={"class": "form-control", "placeholder": "What's on your mind?"}
            )
        }