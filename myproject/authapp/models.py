from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_no = models.CharField(max_length=100, blank=False, null=False)  # Ensure it's not null
    email = models.EmailField(blank=False, null=False)  # Ensure it's not null
    codechef = models.URLField(blank=True, null=True)
    codeforces = models.URLField(blank=True, null=True)
    leetcode = models.URLField(blank=True, null=True)
    geeksforgeeks = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.user.username

    def get_codeforces_handle(self):
        if self.codeforces:
            return self.codeforces.split('/')[-1]  # Extract handle from URL
        return None

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
