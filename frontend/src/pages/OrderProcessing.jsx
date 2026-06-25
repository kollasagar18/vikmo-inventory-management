import { useEffect, useState } from "react";
import api from "../services/api";

function OrderProcessing() {

  const [dealers, setDealers] = useState([]);
  const [products, setProducts] = useState([]);

  const [dealerId, setDealerId] = useState("");
  const [orderId, setOrderId] = useState(null);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadDealers();
    loadProducts();
  }, []);

  const loadDealers = async () => {
    try {
      const res = await api.get("dealers/");
      setDealers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("products/");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {

      const res = await api.post(
        "orders/",
        {
          dealer: dealerId,
          status: "DRAFT"
        }
      );

      setOrderId(res.data.id);

      alert(
        `Order Created Successfully\nOrder ID: ${res.data.id}`
      );

    } catch (error) {

      console.log(error);
      alert("Error Creating Order");

    }
  };

const addItem = async () => {

  // Validation
  if (!productId) {
    alert("Please Select Product");
    return;
  }

  if (!quantity) {
    alert("Please Enter Quantity");
    return;
  }
  if (quantity > 1000) {
  alert("Quantity cannot exceed 1000");
  return;
}

  try {

    const res = await api.post(
      "order-items/",
      {
        order: orderId,
        product: productId,
        quantity: quantity
      }
    );

    console.log(res.data);

    alert("Item Added Successfully");

    setProductId("");
    setQuantity("");

  } catch (error) {

    console.log(error.response?.data);

    alert(
      JSON.stringify(error.response?.data)
    );

  }
};

  const confirmOrder = async () => {

  try {

    const res = await api.post(
      `orders/${orderId}/confirm/`
    );

    alert(res.data.message);

  } catch (error) {

    console.log(error.response?.data);

    alert(
        error.response?.data?.error
      );
    

  }
};
  return (
    <div className="container">

      <h1 className="mb-4">
        Order Processing
      </h1>

      <div className="card shadow p-4">

        <h4>Create Order</h4>

        <select
          className="form-control mb-3"
          value={dealerId}
          onChange={(e) =>
            setDealerId(e.target.value)
          }
        >
          <option value="">
            Select Dealer
          </option>

          {dealers.map((dealer) => (
            <option
              key={dealer.id}
              value={dealer.id}
            >
              {dealer.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary"
          onClick={createOrder}
        >
          Create Order
        </button>

        {orderId && (

          <div className="mt-4">

            <div className="alert alert-success">

              Order Created Successfully

              <br />

              Order ID: {orderId}

            </div>

            <h4>Add Item</h4>

            <select
              className="form-control mb-3"
              value={productId}
              onChange={(e) =>
                setProductId(e.target.value)
              }
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name} (Stock: {product.available_quantity})
              </option>
            ))}
            </select>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />

            <button
              className="btn btn-success"
              onClick={addItem}
            >
              Add Item
            </button>

            <button
              className="btn btn-warning ms-3"
              onClick={confirmOrder}
            >
              Confirm Order
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default OrderProcessing;