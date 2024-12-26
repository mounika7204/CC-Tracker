from django.urls import path
from authapp.views import fetch_student_data


urlpatterns = [
    path('search/<str:name>/', fetch_student_data, name='search-student'),
]
