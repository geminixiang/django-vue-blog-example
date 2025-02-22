from django.contrib import admin
from .models import Post
from .forms import PostForm
from .views import upload_to_imgur


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostForm
    list_display = ["title", "created", "modified", "thumbnail"]
    search_fields = ["title", "content"]

    def save_model(self, request, obj, form, change):
        thumbnail = form.cleaned_data.get("thumbnail")
        if thumbnail:
            thumbnail = upload_to_imgur(thumbnail)
            obj.thumbnail = thumbnail
        obj.save()
