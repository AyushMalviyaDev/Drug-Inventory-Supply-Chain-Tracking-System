
from django.urls import path
from .views import CreateDrugView, ApproveDrugRequestView, CreateDrugRequestView
from .views_dashboard import (
    ManufacturerDashboard,
    DistributorDashboard,
    PharmacyDashboard
)

urlpatterns = [
    path('create-drug/', CreateDrugView.as_view(), name='create-drug'),
    path("approve-request/<int:pk>/", ApproveDrugRequestView.as_view()),
    path("drug-request/", CreateDrugRequestView.as_view()), 
    path("dashboard/manufacturer/", ManufacturerDashboard.as_view()),
    path("dashboard/distributor/", DistributorDashboard.as_view()),
    path("dashboard/pharmacy/", PharmacyDashboard.as_view()),
]