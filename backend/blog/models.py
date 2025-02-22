from django.db.models import CharField, TextField
from django_extensions.db.models import TimeStampedModel


class Post(TimeStampedModel):
    title = CharField(max_length=200)
    content = TextField()

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title
