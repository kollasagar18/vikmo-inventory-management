from django.contrib import admin
from .models import Product, Inventory, Dealer

admin.site.register(Product)
admin.site.register(Inventory)
admin.site.register(Dealer)