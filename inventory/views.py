from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .services.sync_service import sync_product
from rest_framework.views import APIView
from django.db import transaction

from .services.order_service import (
    confirm_order,
    deliver_order
)

from .models import (
    Product,
    Inventory,
    Dealer,
    Order,
    OrderItem
)

from .serializers import (
    ProductSerializer,
    InventorySerializer,
    DealerSerializer,
    OrderSerializer,
    OrderItemSerializer
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.select_related("product")
    serializer_class = InventorySerializer


class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all()
    serializer_class = DealerSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related("items")
    serializer_class = OrderSerializer

    @action(
    detail=True,
    methods=["post"]
    )
    def confirm(self, request, pk=None):

        order = self.get_object()

        if order.status != "DRAFT":
            return Response(
                {
                    "error":
                    "Only Draft Orders Can Be Confirmed"
                },
                status=400
            )

        with transaction.atomic():

            for item in order.items.all():

                inventory = Inventory.objects.select_for_update().get(
                    product=item.product
                )

                if inventory.available_quantity < item.quantity:

                    return Response(
                            {
                                "error":
                                f"❌ Out Of Stock\n\nProduct: {item.product.name}\nAvailable: {inventory.available_quantity}\nRequested: {item.quantity}"
                            },
                            status=400
                        )

            for item in order.items.all():

                inventory = Inventory.objects.select_for_update().get(
                    product=item.product
                )

                inventory.available_quantity -= item.quantity

                inventory.save()

            order.status = "CONFIRMED"
            order.save()

        return Response(
            {
                "message":
                "Order Confirmed Successfully"
            }
        )
    @action(
        detail=True,
        methods=["post"]
    )
    def deliver(self, request, pk=None):

        order = self.get_object()

        try:
            deliver_order(order)

            return Response(
                {"message": "Order delivered successfully"}
            )

        except ValueError as e:

            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    @action(
    detail=True,
    methods=["get"]
    )
    def summary(self, request, pk=None):

        order = self.get_object()

        return Response(
            {
                "order_number": order.order_number,
                "dealer": order.dealer.name,
                "status": order.status,
                "total_amount": order.total_amount,
                "total_items": order.items.count()
            }
        )
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.select_related(
        "order",
        "product"
    )
    serializer_class = OrderItemSerializer
class ChannelSyncView(APIView):

    def post(self, request):

        product, action = sync_product(
            request.data
        )

        return Response(
            {
                "status": action,
                "product_id": product.id,
                "sku": product.sku
            }
        )
# Create your views here.
