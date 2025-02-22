from rest_framework import viewsets
import requests
from django.conf import settings
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


def upload_to_imgur(image):
    url = "https://api.imgur.com/3/image"
    headers = {"Authorization": f"Client-ID {settings.IMGUR_CLIENT_ID}"}
    response = requests.post(url, headers=headers, files={"image": image})
    data = response.json()
    return data["data"]["link"]
