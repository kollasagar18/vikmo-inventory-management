# VIKMO Inventory Management System

## Project Overview

VIKMO Inventory Management System is a backend-focused inventory and order tracking application developed using Django REST Framework and PostgreSQL.

The system allows businesses to manage products, inventory stock, dealers, and customer orders through REST APIs. It provides efficient inventory tracking and order management while maintaining data integrity through relational database design.

This project was developed as part of the VIKMO Python/Django Intern Take-Home Assignment.

---

## Features Implemented

### Product Management

* Create products
* Update products
* Retrieve product details
* Unique SKU validation

### Inventory Management

* Track available stock quantity
* Link inventory with products
* View inventory records

### Dealer Management

* Create dealer profiles
* Store contact information
* Maintain dealer records

### Order Management

* Create orders
* Associate orders with dealers
* Auto-generate order numbers
* Order status tracking

### Order Item Management

* Add products to orders
* Track quantities
* Calculate line totals

### REST API Support

* Django REST Framework implementation
* JSON request/response handling
* CRUD operations

---

## Technology Stack

Backend:

* Python 3.11
* Django 5.2
* Django REST Framework

Database:

* PostgreSQL

Tools:

* Git
* GitHub
* Postman

Frontend:

* React.js
* Axios

Deployment:

* Render / Railway

---

## Project Structure

vikmo-inventory-management/

├── README.md

├── DESIGN.md

├── requirements.txt

├── manage.py

├── vikmo/

│ ├── settings.py

│ ├── urls.py

│ └── wsgi.py

└── inventory/

├── models.py

├── serializers.py

├── views.py

├── urls.py

└── migrations/

---

# API Documentation

## Products

### List Products

GET /api/products/

Description:
Returns all products with inventory information.

### Create Product

POST /api/products/

### Product Detail

GET /api/products/{id}/

### Update Product

PUT /api/products/{id}/

### Delete Product

DELETE /api/products/{id}/

---

## Dealers

### List Dealers

GET /api/dealers/

### Create Dealer

POST /api/dealers/

### Dealer Detail

GET /api/dealers/{id}/

Returns dealer information along with associated orders.

### Update Dealer

PUT /api/dealers/{id}/

---

## Orders

### List Orders

GET /api/orders/

Supports filtering by status and dealer.

### Create Draft Order

POST /api/orders/

### Order Detail

GET /api/orders/{id}/

Returns order information including items.

### Update Draft Order

PUT /api/orders/{id}/

### Confirm Order

POST /api/orders/{id}/confirm/

Validates inventory availability and deducts stock.

### Deliver Order

POST /api/orders/{id}/deliver/

Marks order status as Delivered.

---

## Inventory

### List Inventory

GET /api/inventory/

Returns current stock levels.

### Update Inventory

PUT /api/inventory/{product_id}/

Manually adjusts stock quantity.

---

## Channel Sync

### Trigger Catalogue Sync

POST /api/sync/channel/

Imports and synchronizes catalogue data from external channel feeds.

Alternative:
Management Command

python manage.py sync_catalogue

---

## Example Product Response

{
"id": 1,
"sku": "BRK1000",
"name": "Brake Pad",
"category": "Spare Parts",
"price": "500.00"
}

---

## Setup Instructions

### Clone Repository

git clone https://github.com/kollasagar18/vikmo-inventory-management.git

cd vikmo-inventory-management

### Create Virtual Environment

python -m venv venv

### Activate Environment

Windows:

venv\Scripts\activate

### Install Dependencies

pip install -r requirements.txt

### Run Migrations

python manage.py migrate

### Create Superuser

python manage.py createsuperuser

### Start Server

python manage.py runserver

---

## Testing

All APIs were tested using Postman.

Postman collection is included in the repository.

---

## Assumptions

See DESIGN.md for design assumptions and implementation decisions.
