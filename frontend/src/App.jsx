import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Dealers from "./pages/Dealers";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Operations from "./pages/Operations";
import CreateDealer from "./pages/CreateDealer";
import CreateProduct from "./pages/CreateProduct";
import CreateInventory from "./pages/CreateInventory";
import OrderProcessing from "./pages/OrderProcessing";
import DeliveryDashboard from "./pages/DeliveryDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">

        <Sidebar />

        <div
          className="container-fluid p-4"
          style={{ marginLeft: "10px" }}
        >
          <Routes>

  <Route path="/" element={<Dashboard />} />
<Route
  path="/create-dealer"
  element={<CreateDealer />}
/>
<Route
  path="/create-product"
  element={<CreateProduct />}
/>
<Route
  path="/create-inventory"
  element={<CreateInventory />}
/>
<Route
  path="/delivery"
  element={<DeliveryDashboard />}
/>
<Route
  path="/order-processing"
  element={<OrderProcessing />}
/>
  

  <Route
    path="/products"
    element={<Products />}
  />

  <Route
    path="/inventory"
    element={<Inventory />}
  />

  <Route
    path="/dealers"
    element={<Dealers />}
  />

  <Route
    path="/orders"
    element={<Orders />}
  />

  <Route
    path="/orders/:id"
    element={<OrderDetails />}
  />

</Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;