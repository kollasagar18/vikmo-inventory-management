import { useEffect, useState } from "react";
import api from "../services/api";

function DeliveryDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const res =
        await api.get("orders/");

      const confirmedOrders =
        res.data.filter(
          (order) =>
            order.status === "CONFIRMED"
        );

      setOrders(
        confirmedOrders
      );

    } catch (error) {

      console.log(error);

    }
  };

  const deliverOrder = async (id) => {

    try {

      await api.post(
        `orders/${id}/deliver/`
      );

      alert(
        "Order Delivered Successfully"
      );

      loadOrders();

    } catch (error) {

      console.log(error);

      alert(
        "Error Delivering Order"
      );

    }
  };

  return (
    <div className="container">

      <h1 className="mb-4">
        Delivery Dashboard
      </h1>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Order No</th>
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
                {order.order_number}
              </td>

              <td>
                {order.dealer_name}
              </td>

              <td>
                {order.status}
              </td>

              <td>
                ₹ {order.total_amount}
              </td>

              <td>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    deliverOrder(order.id)
                  }
                >
                  Deliver
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DeliveryDashboard;