import { useEffect, useState } from "react";
import api from "../services/api";

function Inventory() {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const res = await api.get("inventory/");
      setInventory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1 className="mb-4">
        Inventory
      </h1>

      <table className="table table-bordered table-hover">

        <thead>
          <tr>
            <th>Product</th>
            <th>Available Quantity</th>
          </tr>
        </thead>

        <tbody>

  {inventory.map((item) => (

    <tr
      key={item.id}
      className={
        item.available_quantity < 10
          ? "table-danger"
          : ""
      }
    >
      <td>{item.product_name}</td>
      <td>{item.available_quantity}</td>
    </tr>

  ))}

</tbody>
        

      </table>

    </div>
  );
}

export default Inventory;