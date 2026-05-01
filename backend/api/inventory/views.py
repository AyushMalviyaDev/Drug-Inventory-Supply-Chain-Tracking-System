# inventory/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Drug
from .serializers import DrugSerializer
from .permissions import IsManufacturer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsDistributor

class CreateDrugView(APIView):
    permission_classes = [IsManufacturer]

    def post(self, request):
        serializer = DrugSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                manufacturer=request.user
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# inventory/views.py

from .models import DrugRequest
from .serializers import DrugRequestSerializer

class CreateDrugRequestView(APIView):
    permission_classes = [IsAuthenticated, IsDistributor]

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

        drug = drug_request.drug

        if drug.quantity < drug_request.quantity:
            return Response({"error": "Not enough stock"}, status=400)

        drug.quantity -= drug_request.quantity
        drug.save()

        drug_request.status = "APPROVED"
        drug_request.save()

        return Response({"message": "Approved"})