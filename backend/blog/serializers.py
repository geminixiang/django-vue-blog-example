from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "content", "created", "modified", "thumbnail"]
        read_only_fields = ["created", "modified"]
