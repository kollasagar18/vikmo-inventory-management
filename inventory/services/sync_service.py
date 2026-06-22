from inventory.models import Product, Inventory


def sync_product(product_data):

    sku = product_data.get("sku")
    external_id = product_data.get("external_id")

    product = Product.objects.filter(
        sku=sku
    ).first()

    if not product and external_id:
        product = Product.objects.filter(
            external_id=external_id
        ).first()

    if product:

        product.external_id = external_id

        product.name = product_data.get(
            "name",
            product.name
        )

        product.category = product_data.get(
            "category",
            product.category
        )

        product.price = product_data.get(
            "price",
            product.price
        )

        product.save()

        stock = product_data.get("stock")

        if stock is not None:

            inventory, _ = Inventory.objects.get_or_create(
                product=product
            )

            inventory.available_quantity = stock
            inventory.save()

        return product, "updated"

    product = Product.objects.create(
        sku=sku,
        external_id=external_id,
        name=product_data.get("name", sku),
        category=product_data.get("category", "General"),
        price=product_data.get("price", 0)
    )

    Inventory.objects.create(
        product=product,
        available_quantity=product_data.get(
            "stock",
            0
        )
    )

    return product, "created"