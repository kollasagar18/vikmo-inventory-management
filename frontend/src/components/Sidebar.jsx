import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >
      <h3>VIKMO</h3>

      <hr />

      <ul className="list-unstyled">

        <li className="mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
  <Link
    className="text-white text-decoration-none"
    to="/create-dealer"
  >
    Create Dealer
  </Link>
</li>
<li className="mb-3">
  <Link
    className="text-white text-decoration-none"
    to="/create-product"
  >
    Create Product
  </Link>
</li>
<li className="mb-3">
  <Link
    className="text-white text-decoration-none"
    to="/create-inventory"
  >
    Create Inventory
  </Link>
</li>
<li className="mb-3">
  <Link
    className="text-white text-decoration-none"
    to="/order-processing"
  >
    Order Processing
  </Link>
</li>
<li className="mb-3">
  <Link
    className="text-white text-decoration-none"
    to="/delivery"
  >
    Delivery Dashboard
  </Link>
</li>
        <li className="mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/products"
          >
            Products
          </Link>
        </li>
        

        <li className="mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/inventory"
          >
            Inventory
          </Link>
        </li>

        <li className="mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/dealers"
          >
            Dealers
          </Link>
        </li>

        <li className="mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/orders"
          >
            Orders
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;