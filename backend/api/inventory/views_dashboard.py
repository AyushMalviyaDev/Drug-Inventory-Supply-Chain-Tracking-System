from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Drug, DrugRequest, Inventory, Shipment

class ManufacturerDashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        drugs = Drug.objects.filter(user=request.user)
        requests = DrugRequest.objects.filter(to_user=request.user)

        inventory = Inventory.objects.filter(owner=request.user)

        data = {
            "total_drugs": drugs.count(),
            "total_stock": sum(i.quantity for i in inventory),
            "pending_requests": requests.filter(status="PENDING").count(),
            "approved_requests": requests.filter(status="APPROVED").count(),
        }

        return Response(data)

class DistributorDashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        incoming = DrugRequest.objects.filter(to_user=request.user)
        outgoing = DrugRequest.objects.filter(from_user=request.user)

        inventory = Inventory.objects.filter(owner=request.user)

        data = {
            "incoming_requests": incoming.count(),
            "pending_incoming": incoming.filter(status="PENDING").count(),
            "approved_incoming": incoming.filter(status="APPROVED").count(),

            "outgoing_requests": outgoing.count(),
            "pending_outgoing": outgoing.filter(status="PENDING").count(),

            "total_stock": sum(i.quantity for i in inventory),
        }

        return Response(data)

class PharmacyDashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        requests = DrugRequest.objects.filter(from_user=request.user)
        inventory = Inventory.objects.filter(owner=request.user)

        data = {
            "total_orders": requests.count(),
            "pending_orders": requests.filter(status="PENDING").count(),
            "approved_orders": requests.filter(status="APPROVED").count(),

            "stock": [
                {
                    "drug": i.drug.name,
                    "quantity": i.quantity
                }
                for i in inventory
            ]
        }

        return Response(data)


class TransporterDashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        shipments = Shipment.objects.filter(transporter=request.user)

        data = {
            "total_shipments": shipments.count(),
            "pending_shipments": shipments.filter(status="PENDING").count(),
            "in_transit_shipments": shipments.filter(status="IN_TRANSIT").count(),
            "delivered_shipments": shipments.filter(status="DELIVERED").count(),

            "shipments": [
                {
                    "id": s.id,
                    "tracking_number": s.tracking_number,
                    "drug": s.drug_request.drug.name,
                    "quantity": s.drug_request.quantity,
                    "from_user": s.drug_request.from_user.email,
                    "to_user": s.drug_request.to_user.email,
                    "status": s.status,
                    "shipped_at": s.shipped_at,
                    "delivered_at": s.delivered_at,
                }
                for s in shipments
            ]
        }

        return Response(data)