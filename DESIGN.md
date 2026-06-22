# DESIGN DOCUMENT

## Introduction

The VIKMO Inventory Management System is designed to manage products, inventory, dealers, and order processing through REST APIs built with Django REST Framework and PostgreSQL.

The design focuses on data integrity, scalability, inventory consistency, and maintainability.

---

# Model Design Decisions

## Product Model

Purpose:
Stores all catalogue products available for ordering.

Key Fields:

* sku (Unique)
* external_id (Unique, Nullable)
* name
* category
* brand
* vehicle_fitment
* price

Reasoning:

SKU is unique because it acts as the primary business identifier for products.

external_id is used for Channel Sync integration and prevents duplicate imports from external systems.

Price is stored using DecimalField to avoid floating-point inaccuracies.

Indexes:

* sku → indexed for quick product lookup.
* external_id → indexed for channel synchronization.

---

## Inventory Model

Purpose:

Maintains stock information for each product.

Relationship:

Product → Inventory (One-to-One)

Reasoning:

Each product should have exactly one inventory record.

OneToOneField prevents duplicate stock records for the same product.

---

## Dealer Model

Purpose:

Stores dealer information.

Key Fields:

* dealer_code
* name
* email
* phone
* address

Constraints:

dealer_code is unique.

email is unique.

Indexes:

dealer_code is indexed because dealer lookups are frequent during order processing.

---

## Order Model

Purpose:

Represents dealer purchase orders.

Key Fields:

* order_number
* dealer
* status
* total_amount

Status Values:

* DRAFT
* CONFIRMED
* DELIVERED

Reasoning:

Orders are created as DRAFT first.

Inventory is not deducted until confirmation.

This prevents accidental stock reduction during order editing.

Indexes:

* order_number
* status

These fields are commonly used for searching and filtering.

---

## OrderItem Model

Purpose:

Represents individual products within an order.

Fields:

* order
* product
* quantity
* unit_price
* line_total

Reasoning:

unit_price is stored separately to preserve historical pricing.

line_total is stored to simplify reporting and invoice generation.

---

# Relationship Design

## Dealer → Order

ForeignKey(
Dealer,
on_delete=PROTECT
)

Reasoning:

Orders should not become orphaned if a dealer is deleted.

Historical order data must remain available.

---

## Order → OrderItem

ForeignKey(
Order,
on_delete=CASCADE
)

Reasoning:

When an order is deleted, associated order items should also be removed automatically.

---

## Product → OrderItem

ForeignKey(
Product,
on_delete=PROTECT
)

Reasoning:

Products referenced in historical orders must not be deleted accidentally.

---

## Product → Inventory

OneToOneField(
Product,
on_delete=CASCADE
)

Reasoning:

Inventory should be removed automatically if a product is deleted.

---

# Indexing Strategy

The following fields are indexed:

1. Product.sku
2. Product.external_id
3. Dealer.dealer_code
4. Order.order_number
5. Order.status

Benefits:

* Faster searches
* Faster filtering
* Improved API response times
* Efficient synchronization operations

---

# Concurrency Strategy

Inventory updates occur during Order Confirmation.

Potential Issue:

Two users may attempt to confirm orders simultaneously.

Strategy:

Use database transactions and row-level locking.

Example:

transaction.atomic()

select_for_update()

Workflow:

1. Lock inventory rows.
2. Validate available stock.
3. Deduct stock.
4. Update order status.
5. Commit transaction.

This prevents overselling and race conditions.

---

# Channel Sync Design

Purpose:

Synchronize products from external marketplaces or partner systems.

Endpoint:

POST /api/sync/channel/

Workflow:

1. Receive external catalogue.
2. Match using SKU.
3. If product exists:

   * Update details.
4. If product does not exist:

   * Create product.
5. Update inventory stock.
6. Store external_id mapping.

Benefits:

* Prevents duplicates
* Supports incremental updates
* Enables integration with multiple sales channels

---

# Assumptions

1. SKU uniquely identifies a product.
2. One inventory record exists per product.
3. Dealers may place multiple orders.
4. Orders may contain multiple products.
5. Inventory deduction occurs only during order confirmation.
6. Historical orders must remain preserved.

---

# Future Improvements

* JWT Authentication
* Advanced Filtering
* Pagination
* Audit Logging
* Multi-Warehouse Support
* Inventory Forecasting
* Automated Testing
* React Production Deployment

---

# Conclusion

The application follows Django REST Framework best practices and uses proper database constraints, indexing, transactional order confirmation, and synchronization strategies to ensure data consistency and scalability.
