import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const res = await api.get("orders/");
      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const viewSummary = async (id) => {

    try {

      const res =
        await api.get(`orders/${id}/summary/`);

      setSelectedOrder(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <h1 className="mb-4">
        Orders
      </h1>

      <table className="table table-bordered table-hover">

        <thead>
          <tr>
            <th>Order Number</th>
            <th>Dealer</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>

            <Link
              to={`/orders/${order.id}`}
            >
              {order.order_number}
            </Link>

          </td>
              <td>{order.dealer_name}</td>
              <td>

                <span
                  className={
                    order.status === "DELIVERED"
                      ? "badge bg-success"
                      : order.status === "CONFIRMED"
                      ? "badge bg-primary"
                      : "badge bg-warning text-dark"
                  }
                >
                  {order.status}
                </span>

              </td>
              <td>₹ {order.total_amount}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    viewSummary(order.id)
                  }
                >
                  View Details
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedOrder && (

        <div
          className="card shadow mt-4 p-4"
        >

          <h3>Order Summary</h3>

          <p>
            <strong>Order Number:</strong>{" "}
            {selectedOrder.order_number}
          </p>

          <p>
            <strong>Dealer:</strong>{" "}
            {selectedOrder.dealer}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedOrder.status}
          </p>

          <p>
            <strong>Total Amount:</strong>{" "}
            ₹ {selectedOrder.total_amount}
          </p>

          <p>
            <strong>Total Items:</strong>{" "}
            {selectedOrder.total_items}
          </p>

        </div>

      )}

    </div>
  );
}

export default Orders;