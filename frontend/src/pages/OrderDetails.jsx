import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {

    try {

      const res =
        await api.get(`orders/${id}/`);

      setOrder(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!order) {

    return <h3>Loading...</h3>;

  }

  return (
    <div>

      <h1 className="mb-4">
        Order Details
      </h1>

      <div className="card shadow border-0">

        <div className="card-body">

          <h5>
            Order Number:
            {" "}
            {order.order_number}
          </h5>

          <h5>
            Dealer:
            {" "}
            {order.dealer_name}
          </h5>

          <h5>
            Status:
            {" "}
            {order.status}
          </h5>

          <h5>
            Total Amount:
            ₹ {order.total_amount}
          </h5>

        </div>

      </div>

      <div className="card mt-4 shadow border-0">

        <div className="card-body">

          <h4>
            Order Items
          </h4>

          <table className="table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {order.items.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.product_name}
                  </td>

                  <td>
                    {item.quantity}
                  </td>

                  <td>
                    ₹ {item.unit_price}
                  </td>

                  <td>
                    ₹ {item.line_total}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;