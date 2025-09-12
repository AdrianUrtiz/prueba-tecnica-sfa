from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils import timezone

@receiver(post_migrate)
def create_initial_users(sender, **kwargs):
	User = get_user_model()
	password_hash = "pbkdf2_sha256$1000000$exyWVjZmp7pU0KqJS0sa0U$zQu6PrjMS0BAzO+6OpepKzzSoRjF+nsWXWMpwqLtinI="
	date_joined = timezone.now()
	initial_users = [
		{"username": "admin", "first_name": "Admin", "last_name": "Admin", "email": "admin@correo.com", "phone": "00000000", "is_staff": True, "is_superuser": True},
		{"username": "usuario11", "first_name": "Javier", "last_name": "Ortega", "email": "javier11@correo.com", "phone": "111111112"},
		{"username": "usuario7", "first_name": "Carlos", "last_name": "Torres", "email": "carlos7@correo.com", "phone": "777777777"},
		{"username": "usuario13", "first_name": "Diego", "last_name": "Vega", "email": "diego13@correo.com", "phone": "131313131"},
		{"username": "usuario3", "first_name": "Luis", "last_name": "Martínez", "email": "luis3@correo.com", "phone": "333333333"},
		{"username": "usuario1", "first_name": "Juan", "last_name": "Pérez", "email": "juan1@correo.com", "phone": "111111111"},
		{"username": "usuario5", "first_name": "Pedro", "last_name": "Sánchez", "email": "pedro5@correo.com", "phone": "555555555"},
		{"username": "usuario4", "first_name": "María", "last_name": "López", "email": "maria4@correo.com", "phone": "444444444"},
		{"username": "usuario12", "first_name": "Paula", "last_name": "Castro", "email": "paula12@correo.com", "phone": "121212121"},
		{"username": "usuario8", "first_name": "Sofía", "last_name": "Flores", "email": "sofia8@correo.com", "phone": "888888888"},
		{"username": "usuario10", "first_name": "Elena", "last_name": "Morales", "email": "elena10@correo.com", "phone": "101010101"},
		{"username": "usuario6", "first_name": "Lucía", "last_name": "Ramírez", "email": "lucia6@correo.com", "phone": "666666666"},
		{"username": "usuario14", "first_name": "Laura", "last_name": "Silva", "email": "laura14@correo.com", "phone": "141414141"},
		{"username": "usuario2", "first_name": "Ana", "last_name": "García", "email": "ana2@correo.com", "phone": "222222222"},
		{"username": "usuario15", "first_name": "Alberto", "last_name": "Molina", "email": "alberto15@correo.com", "phone": "151515151"},
		{"username": "usuario9", "first_name": "Miguel", "last_name": "Ruiz", "email": "miguel9@correo.com", "phone": "999999999"},
	]
	for user in initial_users:
		if not User.objects.filter(username=user["username"]).exists():
			if user.get("is_superuser"):
				User.objects.create_superuser(
					username=user["username"],
					email=user["email"],
					password="administrador32",
					first_name=user["first_name"],
					last_name=user["last_name"],
					phone=user["phone"]
				)
			else:
				u = User(
					username=user["username"],
					email=user["email"],
					first_name=user["first_name"],
					last_name=user["last_name"],
					phone=user["phone"],
					is_active=True
				)
				u.set_password("clave123")
				u.save()
