from django.db import migrations
from django.utils import timezone
from datetime import timezone as dt_timezone

def create_initial_users(apps, schema_editor):
    User = apps.get_model('users', 'User')
    initial_users = [
        {
            "id": 1, "username": "admin", "first_name": "Admin", "last_name": "Admin", "email": "admin@correo.com", "phone": "00000000", "is_staff": True, "is_superuser": True, "last_login": timezone.now(), "date_joined": timezone.now(),
        },
        {
            "id": 2, "username": "usuario11", "first_name": "Javier", "last_name": "Ortega", "email": "javier11@correo.com", "phone": "111111112",
        },
        {
            "id": 3, "username": "usuario7", "first_name": "Carlos", "last_name": "Torres", "email": "carlos7@correo.com", "phone": "777777777",
        },
        {
            "id": 4, "username": "usuario13", "first_name": "Diego", "last_name": "Vega", "email": "diego13@correo.com", "phone": "131313131",
        },
        {
            "id": 5, "username": "usuario3", "first_name": "Luis", "last_name": "Martínez", "email": "luis3@correo.com", "phone": "333333333",
        },
        {
            "id": 6, "username": "usuario1", "first_name": "Juan", "last_name": "Pérez", "email": "juan1@correo.com", "phone": "111111111",
        },
        {
            "id": 7, "username": "usuario5", "first_name": "Pedro", "last_name": "Sánchez", "email": "pedro5@correo.com", "phone": "555555555",
        },
        {
            "id": 8, "username": "usuario4", "first_name": "María", "last_name": "López", "email": "maria4@correo.com", "phone": "444444444",
        },
        {
            "id": 9, "username": "usuario12", "first_name": "Paula", "last_name": "Castro", "email": "paula12@correo.com", "phone": "121212121",
        },
        {
            "id": 10, "username": "usuario8", "first_name": "Sofía", "last_name": "Flores", "email": "sofia8@correo.com", "phone": "888888888",
        },
        {
            "id": 11, "username": "usuario10", "first_name": "Elena", "last_name": "Morales", "email": "elena10@correo.com", "phone": "101010101",
        },
        {
            "id": 12, "username": "usuario6", "first_name": "Lucía", "last_name": "Ramírez", "email": "lucia6@correo.com", "phone": "666666666",
        },
        {
            "id": 13, "username": "usuario14", "first_name": "Laura", "last_name": "Silva", "email": "laura14@correo.com", "phone": "141414141",
        },
        {
            "id": 14, "username": "usuario2", "first_name": "Ana", "last_name": "García", "email": "ana2@correo.com", "phone": "222222222",
        },
        {
            "id": 15, "username": "usuario15", "first_name": "Alberto", "last_name": "Molina", "email": "alberto15@correo.com", "phone": "151515151",
        },
        {
            "id": 16, "username": "usuario9", "first_name": "Miguel", "last_name": "Ruiz", "email": "miguel9@correo.com", "phone": "999999999",
        }
    ]
    password_hash = "pbkdf2_sha256$1000000$exyWVjZmp7pU0KqJS0sa0U$zQu6PrjMS0BAzO+6OpepKzzSoRjF+nsWXWMpwqLtinI="
    date_joined = timezone.datetime(2025, 9, 5, 2, 11, 39, 26376, tzinfo=dt_timezone.utc)
    for user in initial_users:
        User.objects.update_or_create(
            id=user["id"],
            defaults={
                "username": user["username"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
                "phone": user["phone"],
                "password": password_hash,
                "is_active": True,
                "is_staff": user.get("is_staff", False),
                "is_superuser": user.get("is_superuser", False),
                "last_login": user.get("last_login"),
                "date_joined": user.get("date_joined", date_joined),
            }
        )

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_users),
    ]