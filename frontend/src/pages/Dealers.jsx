import { useEffect, useState } from "react";
import api from "../services/api";

function Dealers() {

  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    loadDealers();
  }, []);

  const loadDealers = async () => {
    try {
      const res = await api.get("dealers/");
      setDealers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1 className="mb-4">
        Dealers
      </h1>

      <table className="table table-bordered table-hover">

        <thead>
          <tr>
            <th>Dealer Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>

          {dealers.map((dealer) => (

            <tr key={dealer.id}>
              <td>{dealer.dealer_code}</td>
              <td>{dealer.name}</td>
              <td>{dealer.email}</td>
              <td>{dealer.phone}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Dealers;