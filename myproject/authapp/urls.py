# # from django.urls import path
# # from .views import signup_view, login_view

# # urlpatterns = [
# #     path('signup/', signup_view, name='signup'),  # Existing signup route
# #     path('login/', login_view, name='login'),      # Define the login route
# # ]
# from django.urls import path
# from .views import signup_view, login_view,home_view

# urlpatterns = [
#     # path('', home_view, name='home'),
#     path('api/signup/', signup_view, name='signup'),
#     path('api/login/', login_view, name='login'),
# ]
# from django.urls import path
# from .views import signup_view, login_view, home_view

from django.urls import path
from . import views
from django.urls import path
from .views import LoginView,SignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
   path('login/', LoginView.as_view(), name='login'),
   path('student/<str:roll_no>/', views.student_detail, name='student_detail')
]

