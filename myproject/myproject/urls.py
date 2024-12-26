# # myproject/urls.py
# from django.urls import path
# from authapp import views

# urlpatterns = [
#     # path('', views.home_view, name='home'),  # Home page (after login)
#     path('auth/signup/', views.signup_view, name='signup'),
#     path('auth/login/', views.login_view, name='login'),
#     # other URLs
# ]
# from django.contrib import admin
# from django.urls import path, include  # Import 'include' to include app URLs

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('auth/', include('authapp.urls')),  # Include authapp URLs
# ]

from django.contrib import admin
from django.urls import path, include
from authapp.views import home_view  # Import your home_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authapp.urls')),  # Include your authapp URLs
    path('', home_view, name='home'),  # Define root path for home page
    path('students/', include('students.urls')),
]
