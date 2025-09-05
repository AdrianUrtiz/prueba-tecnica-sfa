import csv
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([])
def export_users_csv(request):
    from .models import User
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=\"usuarios.csv\"'

    writer = csv.writer(response)
    response.write(u'\ufeff'.encode('utf8'))
    writer.writerow(['ID', 'Username', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Es staff', 'Activo'])

    for user in User.objects.all():
        writer.writerow([
            user.id,
            user.username,
            user.first_name,
            user.last_name,
            user.email,
            user.phone,
            user.is_staff,
            user.is_active,
        ])
    return response