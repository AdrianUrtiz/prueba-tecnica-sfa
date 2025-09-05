from rest_framework.routers import DefaultRouter
from .views import UserViewSet, export_users_csv
from django.urls import path

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    path('users/export/csv/', export_users_csv, name='export_users_csv'),
]