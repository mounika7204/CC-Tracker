from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile

class SignupForm(UserCreationForm):
    roll_no = forms.CharField(max_length=20, required=True)
    email = forms.EmailField(required=True)
    codechef = forms.URLField(required=False)
    codeforces = forms.URLField(required=False)
    leetcode = forms.URLField(required=False)
    geeksforgeeks = forms.URLField(required=False)

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email', 'roll_no', 'codechef', 'codeforces', 'leetcode', 'geeksforgeeks']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            # Save extra fields in UserProfile
            UserProfile.objects.create(
                user=user,
                roll_no=self.cleaned_data['roll_no'],
                codechef=self.cleaned_data.get('codechef'),
                codeforces=self.cleaned_data.get('codeforces'),
                leetcode=self.cleaned_data.get('leetcode'),
                geeksforgeeks=self.cleaned_data.get('geeksforgeeks'),
            )
        return user

# authapp/forms.py
from django.contrib.auth.forms import AuthenticationForm
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

class LoginForm(AuthenticationForm):
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        
        if username and password:
            user = get_user_model().objects.filter(username=username).first()
            if not user:
                raise ValidationError("User does not exist")
            if not user.check_password(password):
                raise ValidationError("Invalid password")
        return cleaned_data
