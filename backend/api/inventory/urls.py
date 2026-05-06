
from django.urls import path
from .views import CreateDrugView, ApproveDrugRequestView, CreateDrugRequestView, UserOrdersView, UpdateShipmentStatusView, TrackShipmentView, CreateShipmentView, NotificationsView, ShipmentTrendsView
from .views_dashboard import (
    ManufacturerDashboard,
    DistributorDashboard,
    PharmacyDashboard,
    TransporterDashboard
)

urlpatterns = [
    path('create-drug/', CreateDrugView.as_view(), name='create-drug'),
    path("approve-request/<int:pk>/", ApproveDrugRequestView.as_view()),
    path("drug-request/", CreateDrugRequestView.as_view()), 
    path("orders/", UserOrdersView.as_view(), name='user-orders'),
    path("shipment/<int:pk>/update-status/", UpdateShipmentStatusView.as_view()),
    path("track/<str:tracking_number>/", TrackShipmentView.as_view()),
    path("shipments/", CreateShipmentView.as_view()),
    path("notifications/", NotificationsView.as_view()),
    path("shipment-trends/", ShipmentTrendsView.as_view()),
    path("dashboard/manufacturer/", ManufacturerDashboard.as_view()),
    path("dashboard/distributor/", DistributorDashboard.as_view()),
    path("dashboard/pharmacy/", PharmacyDashboard.as_view()),
    path("dashboard/transporter/", TransporterDashboard.as_view()),
]