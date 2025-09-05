## Prueba Técnica SFA

Aplicación fullstack para gestión de usuarios con Django REST Framework (backend) y React + Vite (frontend), lista para desarrollo y pruebas en Docker.

---

### 1. Clonar el repositorio

```bash
git clone git@github.com:AdrianUrtiz/prueba-tecnica-sfa.git
cd prueba-tecnica-sfa
```

---

### 2. Configurar variables de entorno

Crea el archivo `.env` en la raíz del proyecto:

```env
DB_NAME=sfa
DB_USER=user_sfa
DB_PASSWORD=password_sfa
DB_HOST=db
DB_PORT=5432
```

---

### 3. Construir y levantar los servicios con Docker

```bash
docker compose up --build -d
```

Esto hará lo siguiente:
- Levantará la base de datos PostgreSQL.
- Aplicará automáticamente las migraciones de Django y cargará los datos iniciales.
- Levantará el backend de Django en [http://localhost:8000](http://localhost:8000)
- Levantará el frontend (Vite + React) en [http://localhost:5173](http://localhost:5173)

---

### 4. Acceso a la aplicación

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** [http://localhost:8000](http://localhost:8000)

---

### 5. Usuarios de prueba

Puedes iniciar sesión con alguno de los usuarios iniciales definidos en las migraciones, por ejemplo:

- **Usuario:** admin  
- **Contraseña:** administrador32

---

### 6. Comandos útiles

- **Detener los servicios:**
	```bash
	docker compose down
	```
- **Eliminar completamente la base de datos (y empezar de cero):**
	```bash
	docker compose down
	docker volume rm prueba-tecnica-sfa_postgres_data
	docker compose up --build -d
	```
	*(Reemplaza el nombre del volumen si es diferente)*

---


### 8. Notas

- Las migraciones y datos iniciales se aplican automáticamente al levantar el backend.
- Si cambias dependencias, reconstruye la imagen con `docker compose build`.
- Para desarrollo local sin Docker, instala dependencias en cada carpeta y configura la base de datos manualmente.

---

**¡Listo! Tu entorno estará funcionando en minutos.**
