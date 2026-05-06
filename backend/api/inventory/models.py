# inventory/models.py
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model



User = get_user_model()




class Drug(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="drugs"
    )

    manufacturer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="manufactured_drugs"
    )

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    batch_number = models.CharField(max_length=100, unique=True)

    quantity = models.IntegerField()
    price = models.FloatField()

    expiry_date = models.DateField()
    manufacture_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Inventory(models.Model):
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)  # manufacturer/distributor/pharmacy
    quantity = models.IntegerField(default=0)

class DrugRequest(models.Model):
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE)

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_requests")

    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)


class Shipment(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_TRANSIT', 'In Transit'),
        ('DELIVERED', 'Delivered'),
    ]

    drug_request = models.OneToOneField(DrugRequest, on_delete=models.CASCADE)
    transporter = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'transporter'})
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    tracking_number = models.CharField(max_length=100, unique=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            import uuid
            self.tracking_number = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Shipment {self.tracking_number} - {self.status}"