import React from "react";

function Operations() {
  return (
    <div>

      <h1 className="mb-4">
        Inventory Operations Center
      </h1>

      <div className="row g-4">

        {/* Create Dealer */}

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">

              <h4>Create Dealer</h4>

              <input
                className="form-control mb-2"
                placeholder="Dealer Code"
              />

              <input
                className="form-control mb-2"
                placeholder="Dealer Name"
              />

              <input
                className="form-control mb-2"
                placeholder="Email"
              />

              <input
                className="form-control mb-2"
                placeholder="Phone"
              />

              <input
                className="form-control mb-2"
                placeholder="Address"
              />

              <button className="btn btn-primary">
                Save Dealer
              </button>

            </div>
          </div>
        </div>

        {/* Create Product */}

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">

              <h4>Create Product</h4>

              <input
                className="form-control mb-2"
                placeholder="SKU"
              />

              <input
                className="form-control mb-2"
                placeholder="Product Name"
              />

              <input
                className="form-control mb-2"
                placeholder="Category"
              />

              <input
                className="form-control mb-2"
                placeholder="Price"
              />

              <button className="btn btn-success">
                Save Product
              </button>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Operations;