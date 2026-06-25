from rest_framework import serializers

from .models import Product, Inventory


from .models import (
    Product,
    Inventory,
    Dealer,
    Order,
    OrderItem
)


from rest_framework import serializers
from .models import Product, Inventory

class ProductSerializer(serializers.ModelSerializer):

    available_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_available_quantity(self, obj):
        try:
            return obj.inventory.available_quantity
        except:
            return 0
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["available_quantity"] = self.get_available_quantity(instance)
        return data

class InventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    class Meta:
        model = Inventory
        fields = "__all__"


class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = "__all__"

        extra_kwargs = {
            "unit_price": {"required": False},
            "line_total": {"required": False},
        }

    def create(self, validated_data):

        from .services.order_service import create_order_item

        return create_order_item(
            validated_data["order"],
            validated_data["product"],
            validated_data["quantity"]
        )
class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    dealer_name = serializers.CharField(
        source="dealer.name",
        read_only=True
    )

    class Meta:
        model = Order
        fields = "__all__"