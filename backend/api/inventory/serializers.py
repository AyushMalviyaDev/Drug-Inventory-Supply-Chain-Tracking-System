
from rest_framework import serializers
from .models import Drug, DrugRequest, Shipment


class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = "__all__"
        read_only_fields = ["user", "manufacturer", "created_at"]


class DrugRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugRequest
        fields = "__all__"
        read_only_fields = ["from_user", "status", "created_at"]


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = "__all__"
        read_only_fields = ["tracking_number", "created_at"]