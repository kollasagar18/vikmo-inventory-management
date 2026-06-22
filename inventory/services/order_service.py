from decimal import Decimal
from django.db import transaction


from inventory.models import (
    Order,
    OrderItem,
    Product,
    Inventory
)
def calculate_line_total(quantity, unit_price):
    return Decimal(quantity) * Decimal(unit_price)


def update_order_total(order):
    total = sum(
        (item.line_total for item in order.items.all()),
        Decimal("0.00")
    )

    order.total_amount = total
    order.save(update_fields=["total_amount"])

    return order.total_amount
def create_order_item(order, product, quantity):

    unit_price = product.price

    line_total = calculate_line_total(
        quantity,
        unit_price
    )

    item = OrderItem.objects.create(
        order=order,
        product=product,
        quantity=quantity,
        unit_price=unit_price,
        line_total=line_total
    )

    update_order_total(order)

    return item

from inventory.models import Inventory


@transaction.atomic
def confirm_order(order):

    if order.status != "DRAFT":
        raise ValueError(
            "Only draft orders can be confirmed."
        )

    for item in order.items.select_related("product"):

        inventory = Inventory.objects.select_for_update().get(
            product=item.product
        )

        if inventory.available_quantity < item.quantity:
            raise ValueError(
                f"Insufficient stock for {item.product.name}. "
                f"Available: {inventory.available_quantity}, "
                f"Requested: {item.quantity}"
            )

    for item in order.items.select_related("product"):

        inventory = Inventory.objects.select_for_update().get(
            product=item.product
        )

        inventory.available_quantity -= item.quantity
        inventory.save(update_fields=["available_quantity"])

    order.status = "CONFIRMED"
    order.save(update_fields=["status"])

    return order
def deliver_order(order):

    if order.status != "CONFIRMED":
        raise ValueError(
            "Only confirmed orders can be delivered."
        )

    order.status = "DELIVERED"
    order.save(update_fields=["status"])

    return order