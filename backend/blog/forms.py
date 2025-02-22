from django import forms
from .models import Post


class PostForm(forms.ModelForm):
    thumbnail = forms.ImageField(required=False)

    class Meta:
        model = Post
        fields = ["title", "content", "thumbnail"]
