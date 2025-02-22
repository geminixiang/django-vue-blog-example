# Django + Vue 3 Blog Example
> A modern blog application built with Django REST framework, Vue 3, and PostgreSQL. This project demonstrates best practices for full-stack development with a decoupled frontend and backend architecture.

![Image](https://github.com/user-attachments/assets/52b3fd5d-b3c6-4d7c-9d96-5ee842b5bbfa)

```shell
docker compose up --build -d
```

## Technology Stack
### Backend: http://localhost:8000/admin/

- **Django** 5.1.6
- **PostgreSQL** 15
- **uv** 0.6.2
- **Docker**

![Image](https://github.com/user-attachments/assets/2843631d-9158-4e19-81a8-2cfffdff3183)

### Frontend: http://localhost:3000/

- **Nuxt** 3.15.4
- **Bun** 1.2.3
- **Docker**

![Image](https://github.com/user-attachments/assets/52b3fd5d-b3c6-4d7c-9d96-5ee842b5bbfa)

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
