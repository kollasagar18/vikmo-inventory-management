import { useState } from "react";
import api from "../services/api";

function CreateDealer() {

  const [dealer, setDealer] = useState({
    dealer_code: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setDealer({
      ...dealer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "dealers/",
        dealer
      );

      console.log(res.data);

      alert("Dealer Created Successfully");

      setDealer({
        dealer_code: "",
        name: "",
        email: "",
        phone: "",
        address: ""
      });

    } catch (error) {

      console.log(error.response?.data);

      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );
    }
  };

  return (
    <div className="container">

      <h1 className="mb-4">
        Create Dealer
      </h1>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            name="dealer_code"
            className="form-control"
            placeholder="Dealer Code"
            value={dealer.dealer_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Dealer Name"
            value={dealer.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={dealer.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Phone"
            value={dealer.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="address"
            className="form-control"
            placeholder="Address"
            value={dealer.address}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Dealer
        </button>

      </form>

    </div>
  );
}

export default CreateDealer;