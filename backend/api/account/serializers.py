from rest_framework import serializers
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils import timezone
from datetime import timedelta

from .models import User
from .utils import generate_otp, send_otp, Util

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'role', 'password']        
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        otp = generate_otp()

        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            tc=validated_data['tc'],
            role=validated_data['role']
        )

        user.email_otp = otp
        user.otp_created_at = timezone.now()
        user.is_verified = False
        user.save()

        return user

    

from datetime import timedelta

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

        
        if user.email_otp != data['otp']:
            raise serializers.ValidationError("Invalid OTP")

        
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            raise serializers.ValidationError("OTP expired")


        user.is_verified = True
        user.email_otp = None
        user.save()

        return data        


class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name', 'role']    

class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )
    password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )
    password2 = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )

    class Meta:
        fields = ['old_password', 'password', 'password2']

    def validate(self, attrs):
        user = self.context.get('user')

        
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError("Old password is incorrect")

        
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match")

        return attrs

    def save(self, **kwargs):
        user = self.context.get('user')
        user.set_password(self.validated_data['password'])
        user.save()
        return user

 

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):    
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        link = 'http://localhost:8000/api/user/reset/'+uid+'/'+token
        print('Password Reset Link:', link) 
        #send email to user logic goes here
        body = 'Click the link below to reset your password:\n\n' + link
        data = {
          'subject' : 'Password Reset Link',
          'body' : body, 
          'to_email' : user.email 
        }
        Util.send_email(data)
        return attrs
    else: 
      raise serializers.ValidationError("You are not a Registered User")    

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']  
  

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError("Token is not Valid or Expired")
      user.set_password(password)
      user.save()
      return super().validate(attrs)
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user) 
      raise serializers.ValidationError("Token is not Valid or Expired")      
