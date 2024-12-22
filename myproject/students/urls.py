# students/urls.py
from django.urls import path
from .views import StudentDetailAPIView

urlpatterns = [
    path('student/<str:roll_no>/', StudentDetailAPIView.as_view(), name='student_detail_api'),
]
