from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from rest_framework.views import APIView  # Import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status


# # Home View - renders home.html template
# def home_view(request):
#     print("Rendering home.html")
#     return render(request, 'home.html')
from django.shortcuts import render

def home_view(request):
    return render(request, 'authapp/home.html')  # Provide the full path here

# Signup API
from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        from django.contrib.auth.hashers import make_password

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)  # Ensure password is hashed
        )

        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


# Login API
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

class LoginView(APIView):  # LoginView must be a class
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')  # Use keys as sent by the frontend
        password = request.data.get('password')
        print(f"Username: {username}, Password: {password}")  # Debugging

        user = authenticate(username=username, password=password)
        # Authentication logic
        if user is not None:  # Example authentication
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from .models import UserProfile
from .utils import fetch_codeforces_data

def student_detail(request, roll_no):
    try:
        student = UserProfile.objects.get(roll_no=roll_no)
        codeforces_username = student.codeforces_url.split("/")[-1] if student.codeforces_url else None
        
        # Fetch Codeforces data
        codeforces_data = fetch_codeforces_data(codeforces_username) if codeforces_username else None

        response_data = {
            "roll_no": student.roll_no,
            "email": student.email,
            "platform_data": {
                "codeforces": codeforces_data,
                # Add similar data for other platforms
            }
        }
        return JsonResponse(response_data, status=200)
    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)



# from django.shortcuts import render, redirect
# from .forms import SignupForm
# # authapp/views.py
# from .forms import LoginForm

# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth import login, authenticate
# from django.shortcuts import render, redirect

# from django.shortcuts import render

# def home_view(request):
#     return render(request, 'authapp/home.html')


# from django.shortcuts import render, redirect
# from django.contrib.auth import authenticate, login
# from django.contrib import messages
# from .forms import LoginForm
# from .models import UserProfile  # If you have a related profile model

# from django.contrib import messages  # Import messages framework

# # authapp/views.py
# from django.contrib.auth import authenticate, login
# from django.contrib import messages
# from .forms import LoginForm
# from django.shortcuts import render, redirect

# # authapp/views.py
# from django.contrib.auth import login, authenticate
# from django.shortcuts import render, redirect
# from .forms import LoginForm

# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth import login
# from django.shortcuts import render, redirect

# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth import login
# from django.shortcuts import render, redirect

# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth import login
# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User

# def login_view(request):
#     if request.method == "POST":
#         form = AuthenticationForm(request, data=request.POST)
#         if form.is_valid():
#             user = form.get_user()
#             # Ensure UserProfile exists
#             if not hasattr(user, 'userprofile'):
#                 from authapp.models import UserProfile
#                 UserProfile.objects.create(user=user)
#             login(request, user)
#             return redirect('home')  # Update to your actual redirect URL
#     else:
#         form = AuthenticationForm()

#     return render(request, 'authapp/login.html', {'form': form})



# from django.contrib.auth.models import User
# from .models import UserProfile

# from django.contrib.auth.models import User
# from django.shortcuts import render, redirect
# from django.contrib import messages

# def signup_view(request):
#     if request.method == "POST":
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         try:
#             user = User.objects.create_user(username=username, password=password)
#             user.save()
#             messages.success(request, "User created successfully!")
#             return redirect('login')  # Replace 'login' with your login URL
#         except Exception as e:
#             print("Error during user creation:", str(e))
#             messages.error(request, "Error creating user. Please try again.")
#     return render(request, 'authapp/signup.html')  # Ensure this template path exists



