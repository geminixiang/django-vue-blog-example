# Django + Vue 3 Blog Example
> A modern blog application built with Django REST framework, Vue 3, and PostgreSQL. This project demonstrates best practices for full-stack development with a decoupled frontend and backend architecture.

```shell
docker compose up --build -d
```

## Technology Stack
### Backend

- **Django** 5.1.6
- **PostgreSQL** 15
- **uv** 0.6.2
- **Docker**

### Frontend

- **Nuxt** 3.15.4
- **Bun** 1.2.3
- **Docker**

### Database

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
