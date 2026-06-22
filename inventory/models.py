from django.db import models
from django.utils import timezone


class Product(models.Model):
    class Meta:
        ordering = ['-created_at']
    sku = models.CharField(max_length=100, unique=True, db_index=True)
    external_id = models.CharField(
    max_length=100,
    blank=True,
    null=True,
    unique=True
)

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)

    brand = models.CharField(max_length=100, blank=True, null=True)
    vehicle_fitment = models.CharField(max_length=255, blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sku} - {self.name}"


class Inventory(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name="inventory"
    )

    available_quantity = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.available_quantity}"
class Dealer(models.Model):
    dealer_code = models.CharField(
        max_length=50,
        unique=True,
        db_index=True
    )

    name = models.CharField(max_length=255)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=20)

    address = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.dealer_code} - {self.name}"
    
    
class Order(models.Model):

    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('CONFIRMED', 'Confirmed'),
        ('DELIVERED', 'Delivered'),
    ]

    order_number = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        blank=True
    )

    dealer = models.ForeignKey(
        Dealer,
        on_delete=models.PROTECT,
        related_name='orders'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='DRAFT',
        db_index=True
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):

        if not self.order_number:

            today = timezone.now().strftime("%Y%m%d")

            last_order = Order.objects.order_by('-id').first()

            next_id = 1

            if last_order:
                next_id = last_order.id + 1

            self.order_number = f"ORD-{today}-{next_id:04d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_number
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    line_total = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.order.order_number} - {self.product.name}" 
    