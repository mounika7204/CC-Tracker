# students/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer

class StudentDetailAPIView(APIView):
    def get(self, request, roll_no):
        try:
            user_profile = UserProfile.objects.get(roll_no=roll_no)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
