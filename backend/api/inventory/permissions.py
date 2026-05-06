from rest_framework.permissions import BasePermission

class IsManufacturer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manufacturer'


class IsDistributor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "distributor"


class IsManufacturerOrDistributor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['manufacturer', 'distributor']


class IsTransporter(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'transporter'

