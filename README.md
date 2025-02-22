### Init

```shell
docker compose up --build
```

```shell
❯ docker compose exec backend python manage.py createsuperuser
Username (leave blank to use 'root'):
Email address:
Password:
Password (again):
Superuser created successfully.
```

#### create new migrate

```shell
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```