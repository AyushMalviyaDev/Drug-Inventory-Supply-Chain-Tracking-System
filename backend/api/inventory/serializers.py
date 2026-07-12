
from rest_framework import serializers
from .models import Drug, DrugRequest, Shipment
import qrcode
import base64
from io import BytesIO


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
    qr_code = serializers.SerializerMethodField()

    class Meta:
        model = Shipment
        fields = "__all__"
        read_only_fields = ["tracking_number", "created_at"]

    def get_qr_code(self, obj):
        """Generate QR code for shipment tracking"""
        qr = qrcode.QRCode(version=1, box_size=10, border=4)
        qr.add_data(obj.tracking_number)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        qr_base64 = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/png;base64,{qr_base64}"