# students/serializers.py
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['roll_no', 'email', 'codechef', 'codeforces', 'leetcode', 'geeksforgeeks']
