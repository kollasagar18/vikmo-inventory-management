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

      await api.post(
        "dealers/",
        dealer
      );

      alert("Dealer Created Successfully");

      setDealer({
        dealer_code: "",
        name: "",
        email: "",
        phone: "",
        address: ""
      });

    } catch (error) {

      console.log(error);
      alert("Error Creating Dealer");

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
          />
        </div>

        <div className="mb-3">
          <textarea
            name="address"
            className="form-control"
            placeholder="Address"
            value={dealer.address}
            onChange={handleChange}
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