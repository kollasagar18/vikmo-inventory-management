import json

from django.core.management.base import BaseCommand

from inventory.models import Product, Inventory


class Command(BaseCommand):

    help = "Import products from catalogue.json"

    def handle(self, *args, **kwargs):

        with open("catalogue.json", "r", encoding="utf-8") as file:
            products = json.load(file)

        created_count = 0

        for item in products:

            product, created = Product.objects.get_or_create(
                sku=item["sku"],
                defaults={
                    "name": item["name"],
                    "category": item["category"],
                    "brand": item.get("brand"),
                    "vehicle_fitment": item.get("vehicle_fitment"),
                    "price": item["price_inr"],
                    "description": item.get("description", "")
                }
            )

            Inventory.objects.get_or_create(
                product=product,
                defaults={
                    "available_quantity": item["stock"]
                }
            )

            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created_count} products imported successfully."
            )
        )