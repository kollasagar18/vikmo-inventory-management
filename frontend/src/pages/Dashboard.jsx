import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaExclamationTriangle
} from "react-icons/fa";

function Dashboard() {

  const [products, setProducts] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [orders, setOrders] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const productRes =
        await api.get("products/");

      const inventoryRes =
        await api.get("inventory/");

      const orderRes =
        await api.get("orders/");

      setProducts(productRes.data.length);
      setInventory(inventoryRes.data.length);
      setOrders(orderRes.data.length);

      const lowStockItems =
        inventoryRes.data.filter(
          (item) => item.available_quantity < 10
        );

      setLowStock(lowStockItems.length);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      {/* Header */}

      <div className="mb-4">

        <h1 className="fw-bold">
          Vikmo Inventory Dashboard
        </h1>

        <p className="text-muted">
          Inventory Management & Order Tracking System
        </p>

      </div>

      {/* Cards */}

      <div className="row g-4">

        {/* Products */}

        <div className="col-md-3">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">

              <FaBoxOpen
                size={40}
                className="text-primary mb-3"
              />

              <h5>Total Products</h5>

              <h2 className="fw-bold">
                {products}
              </h2>

            </div>
          </div>
        </div>

        {/* Inventory */}

        <div className="col-md-3">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">

              <FaWarehouse
                size={40}
                className="text-success mb-3"
              />

              <h5>Total Inventory</h5>

              <h2 className="fw-bold">
                {inventory}
              </h2>

            </div>
          </div>
        </div>

        {/* Orders */}

        <div className="col-md-3">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">

              <FaShoppingCart
                size={40}
                className="text-danger mb-3"
              />

              <h5>Total Orders</h5>

              <h2 className="fw-bold">
                {orders}
              </h2>

            </div>
          </div>
        </div>

        {/* Low Stock */}

        <div className="col-md-3">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">

              <FaExclamationTriangle
                size={40}
                className="text-warning mb-3"
              />

              <h5>Low Stock Items</h5>

              <h2 className="fw-bold">
                {lowStock}
              </h2>

            </div>
          </div>
        </div>

      </div>

      {/* Summary Section */}

      <div className="row mt-5">

        <div className="col-md-12">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body">

              <h4 className="mb-3">
                System Summary
              </h4>

              <ul className="list-group">

                <li className="list-group-item">
                  Total Products:
                  <strong> {products}</strong>
                </li>

                <li className="list-group-item">
                  Inventory Records:
                  <strong> {inventory}</strong>
                </li>

                <li className="list-group-item">
                  Orders Processed:
                  <strong> {orders}</strong>
                </li>

                <li className="list-group-item">
                  Low Stock Alerts:
                  <strong> {lowStock}</strong>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;