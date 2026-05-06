# inventory/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Drug, Inventory, DrugRequest, Shipment
from .serializers import DrugSerializer, DrugRequestSerializer, ShipmentSerializer
from .permissions import IsManufacturer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsDistributor

class CreateDrugView(APIView):
    permission_classes = [IsManufacturer]

    def post(self, request):
        serializer = DrugSerializer(data=request.data)

        if serializer.is_valid():
            drug = serializer.save(
                user=request.user,
                manufacturer=request.user
            )
            # Create inventory for the manufacturer
            Inventory.objects.create(
                drug=drug,
                owner=request.user,
                quantity=drug.quantity
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# inventory/views.py

from .models import DrugRequest
from .serializers import DrugRequestSerializer

class CreateDrugRequestView(APIView):
    permission_classes = []

    def get(self, request):
        qs = DrugRequest.objects.filter(from_user=request.user)
        serializer = DrugRequestSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DrugRequestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(from_user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class ApproveDrugRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        drug_request = DrugRequest.objects.get(id=pk)

        # ✅ ONLY receiver can approve
        if drug_request.to_user != request.user:
            return Response({"error": "Not allowed"}, status=403)

        if drug_request.status != "PENDING":
            return Response({"error": "Already processed"}, status=400)

        # Get or create inventory for the to_user (provider)
        inventory_to, created = Inventory.objects.get_or_create(
            drug=drug_request.drug,
            owner=drug_request.to_user,
            defaults={'quantity': 0}
        )

        if inventory_to.quantity < drug_request.quantity:
            return Response({"error": "Not enough stock"}, status=400)

        # Reduce to_user's inventory
        inventory_to.quantity -= drug_request.quantity
        inventory_to.save()

        # Increase from_user's inventory
        inventory_from, created = Inventory.objects.get_or_create(
            drug=drug_request.drug,
            owner=drug_request.from_user,
            defaults={'quantity': 0}
        )
        inventory_from.quantity += drug_request.quantity
        inventory_from.save()

        drug_request.status = "APPROVED"
        drug_request.save()

        # Create shipment
        User = get_user_model()
        transporter = User.objects.filter(role='transporter').order_by('?').first()
        if transporter:
            Shipment.objects.create(drug_request=drug_request, transporter=transporter)

        return Response({"message": "Approved"})


class UpdateShipmentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            shipment = Shipment.objects.get(id=pk, transporter=request.user)
        except Shipment.DoesNotExist:
            return Response({"error": "Shipment not found or not assigned to you"}, status=404)

        new_status = request.data.get('status')
        if new_status not in ['PENDING', 'IN_TRANSIT', 'DELIVERED']:
            return Response({"error": "Invalid status"}, status=400)

        shipment.status = new_status
        if new_status == 'IN_TRANSIT' and not shipment.shipped_at:
            from django.utils import timezone
            shipment.shipped_at = timezone.now()
        elif new_status == 'DELIVERED' and not shipment.delivered_at:
            from django.utils import timezone
            shipment.delivered_at = timezone.now()

        shipment.save()
        return Response({"message": "Status updated"})


class TrackShipmentView(APIView):
    def get(self, request, tracking_number):
        try:
            shipment = Shipment.objects.get(tracking_number=tracking_number.upper())
        except Shipment.DoesNotExist:
            return Response({"error": "Shipment not found"}, status=404)

        serializer = ShipmentSerializer(shipment)
        return Response(serializer.data)


class UserOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all drug requests made by the current user (orders they have placed)
        orders = DrugRequest.objects.filter(from_user=request.user).order_by('-created_at')
        serializer = DrugRequestSerializer(orders, many=True)
        return Response(serializer.data)


class CreateShipmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        drug_request_id = request.data.get('drug_request')
        transporter_id = request.data.get('transporter')

        try:
            drug_request = DrugRequest.objects.get(id=drug_request_id, status='APPROVED')
        except DrugRequest.DoesNotExist:
            return Response({"error": "Approved drug request not found"}, status=404)

        # Check if shipment already exists
        if Shipment.objects.filter(drug_request=drug_request).exists():
            return Response({"error": "Shipment already created"}, status=400)

        shipment = Shipment.objects.create(
            drug_request=drug_request,
            transporter_id=transporter_id
        )
        return Response({"id": shipment.id, "tracking_number": shipment.tracking_number}, status=201)


class NotificationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = []
        if request.user.role in ['distributor', 'pharmacist']:
            pending_requests = DrugRequest.objects.filter(to_user=request.user, status='PENDING')
            notifications.extend([
                {
                    "message": f"New request for {r.drug.name} ({r.quantity}) from {r.from_user.name}",
                    "type": "request",
                    "id": r.id
                } for r in pending_requests
            ])

        # Add low stock alerts
        inventory = Inventory.objects.filter(owner=request.user, quantity__lt=10)
        notifications.extend([
            {
                "message": f"Low stock for {i.drug.name} ({i.quantity} left)",
                "type": "low_stock",
                "id": i.id
            } for i in inventory
        ])

        return Response(notifications)


class ShipmentTrendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.db.models import Count
        from django.db.models.functions import TruncMonth

        # Aggregate shipments by month
        trends = Shipment.objects.annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).order_by('month')

        labels = [t['month'].strftime('%b %Y') for t in trends]
        data = [t['count'] for t in trends]

        return Response({"labels": labels, "data": data})

