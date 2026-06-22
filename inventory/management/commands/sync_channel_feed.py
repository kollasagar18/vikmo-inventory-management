import json

from django.core.management.base import BaseCommand

from inventory.services.sync_service import sync_product


class Command(BaseCommand):

    help = "Sync products from channel_feed.json"

    def handle(self, *args, **kwargs):

        with open(
            "channel_feed.json",
            "r",
            encoding="utf-8"
        ) as file:

            products = json.load(file)

        created_count = 0
        updated_count = 0

        for product_data in products:

            product, action = sync_product(
                product_data
            )

            if action == "created":
                created_count += 1

            elif action == "updated":
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Created: {created_count}, Updated: {updated_count}"
            )
        )