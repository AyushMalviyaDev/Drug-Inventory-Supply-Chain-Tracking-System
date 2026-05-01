
from rest_framework import serializers
from .models import Drug, DrugRequest


class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = "__all__"
        read_only_fields = ["user", "manufacturer", "created_at"]


class DrugRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugRequest
        fields = "__all__"
        read_only_fields = ["requested_by", "status", "created_at"]