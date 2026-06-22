import { useState } from "react";
import api from "../services/api";

function CreateProduct() {

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    category: "",
    price: "",
    brand: "",
    vehicle_fitment: "",
    description: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "products/",
        product
      );

      alert("Product Created Successfully");

      setProduct({
        sku: "",
        name: "",
        category: "",
        price: "",
        brand: "",
        vehicle_fitment: "",
        description: ""
      });

    } catch (error) {

      console.log(error);
      alert("Error Creating Product");
    }
  };

  return (
    <div className="container">

      <h1 className="mb-4">
        Create Product
      </h1>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            name="sku"
            className="form-control"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="brand"
            className="form-control"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="vehicle_fitment"
            className="form-control"
            placeholder="Vehicle Fitment"
            value={product.vehicle_fitment}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
        >
          Save Product
        </button>

      </form>

    </div>
  );
}

export default CreateProduct;