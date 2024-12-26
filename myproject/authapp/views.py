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
import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from .models import UserProfile

import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from .models import UserProfile

# Fetch Codeforces Data (Scraping)
import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup

import requests

def fetch_codeforces_data(handle):
    # Fetch basic user info (rating, rank, etc.)
    user_info_url = f"https://codeforces.com/api/user.info?handles={handle}"
    response = requests.get(user_info_url)
    data = response.json()

    if response.status_code != 200 or data['status'] != 'OK':
        return f"Error: Unable to fetch profile for {handle}"
    
    user_info = data['result'][0]
    rating = user_info.get('rating', 'Not Found')
    max_rank = user_info.get('maxRank', 'Not Found')

    # Fetch submission data to count problems solved
    submission_url = f"https://codeforces.com/api/user.status?handle={handle}"
    response = requests.get(submission_url)
    submission_data = response.json()

    if submission_data['status'] == 'OK':
        submissions = submission_data['result']
        solved_problems = set()

        for submission in submissions:
            if submission['verdict'] == 'OK':
                problem_id = f"{submission['problem']['contestId']}-{submission['problem']['index']}"
                solved_problems.add(problem_id)
        
        problems_solved = len(solved_problems)
    else:
        problems_solved = "Not Found"

    print("Extracted Rating:", rating, flush=True)
    print("Extracted Max Rank:", max_rank, flush=True)
    print("Number of Problems Solved:", problems_solved, flush=True)

    return {
        "rating": rating,
        "problems_solved": problems_solved
    }

# Example Test
fetch_codeforces_data("mounikakasa72")

# Fetch CodeChef Data (Scraping)
import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup

def fetch_codechef_data(handle):
    url = f"https://www.codechef.com/users/{handle}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return f"Error: Unable to fetch profile for {handle}. Status code: {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract rating
    rating = "Not Found"
    rating_section = soup.find("div", class_="rating-number")
    if rating_section:
        rating = rating_section.text.strip()

    # Extract stars (rank)
    stars = "Not Found"
    star_section = soup.find("span", class_="rating")
    if star_section:
        stars = star_section.text.strip()

    # Extract total problems solved
    total_problems_solved = "Not Found"
    problems_solved_section = soup.find("h3", string=lambda text: text and "Total Problems Solved" in text)
    if problems_solved_section:
        total_problems_solved = problems_solved_section.text.strip().split(":")[1].strip()

    return {
        "rating": rating,
        "stars": stars,
        "problems_solved": total_problems_solved
    }

# Example Test
data = fetch_codechef_data("bvrit_2813")
print(data)

# Example Test
fetch_codechef_data("bvrit_2813")


import requests
import json

def fetch_leetcode_data(username):
    url = "https://leetcode.com/graphql/"
    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com/{username}/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    # GraphQL query for fetching user profile data
    payload = {
        "query": """
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    ranking
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        count
                    }
                }
            }
        }
        """,
        "variables": {
            "username": username
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print("data: ",data)
        try:
            user_data = data['data']['matchedUser']
            problems_solved = user_data['submitStatsGlobal']['acSubmissionNum'][0]['count']
            rating = user_data['profile']['ranking']
            return {
                "rating": rating,
                "problems_solved": problems_solved
            }

        except KeyError:
            return {"error": "User not found or data structure changed"}
    
    return {"error": "Failed to fetch data"}


import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup

def fetch_hackerrank_data(username):
    url = f"https://www.hackerrank.com/{username}/submissions/all"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the table containing the submissions
        table = soup.find('table', class_ ='submissions')  # Replace 'your-table-class' with actual class
        if table:
            # Find all the tr tags inside the table (these represent the solved problems)
            rows = table.find_all('tr')
            
            # Exclude the first row if it's the header
            solved_problems_count = len(rows) - 1  # Subtract 1 to exclude the header row
            return {"solved_problems_count": solved_problems_count}
        else:
            return {"error": "Submissions table not found"}
    else:
        return {"error": f"Failed to fetch submissions, HTTP {response.status_code}"}


# View to fetch student data
def fetch_student_data(request, name):
    try:
        print(f"Searching for: {name}")
        
        # Fetch the user profile based on the username
        user_profile = UserProfile.objects.filter(user__username__iexact=name).first()
        print("userprofile: ", user_profile)

        if not user_profile:
            return JsonResponse({'error': 'User not found'}, status=404)

        platform_data = {}

        # Codeforces Data
        if user_profile.codeforces:
            codeforces_handle = user_profile.codeforces.split('/')[-1]
            print(f"Fetching Codeforces Data for {codeforces_handle}")
            cf_data = fetch_codeforces_data(codeforces_handle)
            platform_data['codeforces'] = cf_data

        # CodeChef Data
        if user_profile.codechef:
            codechef_handle = user_profile.codechef.split('/')[-1]
            print(f"Fetching CodeChef Data for {codechef_handle}")
            codechef_data = fetch_codechef_data(codechef_handle)
            platform_data['codechef'] = codechef_data

        # LeetCode Data
        if user_profile.leetcode:
    # Check if URL contains '/u/' and extract the handle
            if '/u/' in user_profile.leetcode:
                leetcode_handle = user_profile.leetcode.split('/u/')[-1].rstrip('/')
            else:
                leetcode_handle = user_profile.leetcode.split('/')[-1].rstrip('/')
            
            print("handle: ", leetcode_handle)
            
            if leetcode_handle:
                print(f"Fetching LeetCode Data for {leetcode_handle}")
                leetcode_data = fetch_leetcode_data(leetcode_handle)
                platform_data['leetcode'] = leetcode_data
            else:
                platform_data['leetcode'] = {'error': 'LeetCode handle is empty.'}
        else:
            platform_data['leetcode'] = {'error': 'LeetCode handle is missing.'}

        # HackerRank Data
        if user_profile.hackerrank:
            try:
                hackerrank_handle = user_profile.hackerrank.split('/')[-1]
                print("handle: ",hackerrank_handle)
                hackerrank_data = fetch_hackerrank_data(hackerrank_handle)
                print("hackerrank data: ",hackerrank_data)
                platform_data['hackerrank'] = hackerrank_data
            except Exception as e:
                platform_data['hackerrank'] = {
                    'handle': user_profile.hackerrank,
                    'error': f'HackerRank data fetch failed: {str(e)}'
                }

        # Return the response with the user's data
        return JsonResponse({
            'roll_no': user_profile.roll_no,
            'email': user_profile.email,
            'platform_data': platform_data,
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# def fetch_student_data(request, name):
#     try:
#         print(f"Searching for: {name}")
        
#         # Fetch the user profile based on the username
#         user_profile = UserProfile.objects.filter(user__username__iexact=name).first()

#                # Debugging: Print the fields to ensure they are populated
#         print(f"User Profile Found: {user_profile}")
#         print(f"Roll No: {user_profile.roll_no}")  # Check if it's populated
#         print(f"Email: {user_profile.email}")  # Check if it's populated

#         if not user_profile:
#             return JsonResponse({'error': 'User not found'}, status=404)

#         # Debugging: Print the found user profile to check data
#         print(f"User Profile Found: {user_profile}")  

#         platform_data = {}

#         # Codeforces Data
#         if user_profile.codeforces:
#             codeforces_handle = user_profile.codeforces.split('/')[-1]
#             url = f'https://codeforces.com/api/user.info?handles={codeforces_handle}'
#             codeforces_response = requests.get(url).json()
#             # codeforces_data = codeforces_response['result'][0]
#             # codeforces_solved = fetch_codeforces_data(codeforces_handle)
#             if codeforces_response.get('status') == 'OK':
#                 platform_data['codeforces'] = {
#                     'handle': codeforces_handle,
#                     'rating': codeforces_response['result'][0].get('rating', 'N/A'),
#                     'rank': codeforces_response['result'][0].get('rank', 'N/A'),
#                     # 'problems_solved': codeforces_solved, 
#                 }

#         # CodeChef Data
#         if user_profile.codechef:
#             codechef_handle = user_profile.codechef.split('/')[-1]
#             platform_data['codechef'] = {
#                 'handle': codechef_handle,
#                 'rating': 'N/A (Scraping Required)',  # You may want to implement scraping here
#                 'global_rank': 'N/A (Scraping Required)',
#             }

#         # LeetCode Data
#         if user_profile.leetcode:
#             leetcode_handle = user_profile.leetcode.split('/')[-1]
#             platform_data['leetcode'] = {
#                 'handle': leetcode_handle,
#                 'rating': 'N/A (API Required)',  # You may want to implement LeetCode API fetching here
#             }

#         # HackerRank Data
#         if user_profile.hackerrank:
#             hackerrank_handle = user_profile.hackerrank.split('/')[-1]
#             platform_data['hackerrank'] = {
#                 'handle': hackerrank_handle,
#                 'rating': 'N/A (API Required)',  # You may want to implement HackerRank API fetching here
#             }

#         # Return the response with the user's data
#         return JsonResponse({
#             'roll_no': user_profile.roll_no,
#             'email': user_profile.email,
#             'platform_data': platform_data,
#         })

#     except Exception as e:
#         # Catch any errors and return them in the response
#         return JsonResponse({'error': str(e)}, status=500)

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



