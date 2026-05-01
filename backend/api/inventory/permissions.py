from rest_framework.permissions import BasePermission

class IsManufacturer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manufacturer'


class IsDistributor(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "distributor"

