from time import timezone

from rest_framework.response import Response    
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from account.models import User
from account.renderers import UserRenderer
from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserPasswordResetSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .utils import generate_otp, send_otp
#from django.conf import settings
#from google.oauth2 import id_token

# generates token manually for a user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()

            otp = generate_otp()
            user.email_otp = otp
            user.otp_created_at = timezone.now()
            user.is_verified = False
            user.save()
              # Debugging line to check OTP generation
            send_otp(user.email, otp)

            return Response({
                "message": "OTP sent to your email. Please verify."
            }, status=status.HTTP_201_CREATED)
    
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')  
            password = serializer.validated_data.get('password')
            user = authenticate(request, email=email, password=password)

            if user is not None:
                if not user.is_verified and not user.is_admin:
                        return Response(
                            {"error": "Please verify your email first"},
                            status=status.HTTP_403_FORBIDDEN
                        )

                tokens = get_tokens_for_user(user)
                return Response({
                    "tokens": tokens,
                    "message": "User logged in successfully"
                }, status=status.HTTP_200_OK)

            # ✅ Handle invalid credentials
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request,format=None):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user

            password = serializer.validated_data.get('password')
            password2 = serializer.validated_data.get('password2')
            old_password = request.data.get('old_password')

            # ✅ check old password
            if not user.check_password(old_password):
                return Response(
                    {"error": "Old password is incorrect"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ✅ check match
            if password != password2:
                return Response(
                    {"error": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ✅ THIS WAS MISSING
            user.set_password(password)
            user.save()

            return Response({"message": "Password updated successfully"})

        return Response(serializer.errors, status=400)

class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True): 
            email = serializer.validated_data.get('email')
            # Logic for sending password reset email goes here
            
            return Response({"message": "Password reset email sent successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
       serializer = UserPasswordResetSerializer(data=request.data, context ={'uid': uid, 'token': token})
       if serializer.is_valid(raise_exception=True):
              # Logic for resetting the password goes here

              return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


from datetime import timedelta
from django.utils import timezone

class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # ❌ Wrong OTP
        if user.email_otp != otp:
            return Response({"error": "Invalid OTP"}, status=400)

        # ⏱ Expiry check
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            return Response({"error": "OTP expired"}, status=400)

        # ✅ Verify user
        user.is_verified = True
        user.email_otp = None
        user.save()

        return Response({"message": "Email verified successfully"})    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": getattr(user, "role", None)
        })