import { useEffect, useState } from "react";
import api from "../services/api";

function CreateInventory() {

  const [products, setProducts] = useState([]);

  const [inventory, setInventory] = useState({
    product: "",
    available_quantity: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const res =
        await api.get("products/");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setInventory({
      ...inventory,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "inventory/",
        inventory
      );

      alert(
        "Inventory Created Successfully"
      );

      setInventory({
        product: "",
        available_quantity: ""
      });

    } catch (error) {

      console.log(error);
      alert("Error Creating Inventory");

    }
  };

  return (
    <div className="container">

      <h1 className="mb-4">
        Create Inventory
      </h1>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>
            Select Product
          </label>

          <select
            className="form-control"
            name="product"
            value={inventory.product}
            onChange={handleChange}
          >

            <option value="">
              Select Product
            </option>

            {products.map((product) => (

              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>

            ))}

          </select>

        </div>

        <div className="mb-3">

          <label>
            Available Quantity
          </label>

          <input
            type="number"
            className="form-control"
            name="available_quantity"
            value={inventory.available_quantity}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="btn btn-success"
        >
          Save Inventory
        </button>

      </form>

    </div>
  );
}

export default CreateInventory;