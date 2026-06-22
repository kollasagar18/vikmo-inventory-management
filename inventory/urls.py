from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProductViewSet,
    InventoryViewSet,
    DealerViewSet,
    OrderViewSet,
    OrderItemViewSet,
    ChannelSyncView
)

router = DefaultRouter()

router.register(r'products', ProductViewSet)
router.register(r'inventory', InventoryViewSet)
router.register(r'dealers', DealerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items',OrderItemViewSet)

urlpatterns = router.urls + [
    path(
        "sync/channel/",
        ChannelSyncView.as_view(),
        name="channel-sync"
    )
]