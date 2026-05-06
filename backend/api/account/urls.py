
from django.urls import include, path
from account.views import UserChangePasswordView, UserLoginView, UserRegistrationView, UserProfileView, SendPasswordResetEmailView, UserPasswordResetView, VerifyOTPView, MeView   
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('verify-email/', VerifyOTPView.as_view(), name='verify-email'),
    path("user/me/", MeView.as_view()),
]
 