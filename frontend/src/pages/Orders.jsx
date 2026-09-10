import { useState } from "react";
import "./Orders.css";

function Orders() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-001",
      customer: "ABC Construction",
      site: "Sector 57, Gurugram",
      date: "28 Aug 2026",
      status: "Active",
      items: [
        {
          product: "Setting Plate",
          size: "3 Meter",
          issued: 60,
          returned: 20,
          damaged: 2,
        },
        {
          product: "Setting Plate",
          size: "2.5 Meter",
          issued: 30,
          returned: 10,
          damaged: 1,
        },
        {
          product: "Base Jack",
          size: null,
          issued: 20,
          returned: 5,
          damaged: 0,
        },
        {
          product: "Pin",
          size: null,
          issued: 100,
          returned: 40,
          damaged: 2,
        },
      ],
    },
    {
      id: "ORD-002",
      customer: "Sharma Builders",
      site: "Sohna Road, Gurugram",
      date: "25 Aug 2026",
      status: "Active",
      items: [
        {
          product: "Setting Plate",
          size: "3 Meter",
          issued: 80,
          returned: 30,
          damaged: 3,
        },
        {
          product: "Jack",
          size: null,
          issued: 40,
          returned: 15,
          damaged: 1,
        },
      ],
    },
    {
      id: "ORD-003",
      customer: "Raj Construction",
      site: "Manesar",
      date: "20 Aug 2026",
      status: "Completed",
      items: [
        {
          product: "Setting Plate",
          size: "1 Meter",
          issued: 40,
          returned: 40,
          damaged: 0,
        },
        {
          product: "Base Jack",
          size: null,
          issued: 20,
          returned: 20,
          damaged: 0,
        },
      ],
    },
  ];

  const getWithCustomer = (item) =>
    Math.max(0, item.issued - item.returned - item.damaged);

  return (
    <div className="orders-page">

      {/* Header */}
      <div className="orders-header">
        <div>
          <p className="page-label">MATERIAL MANAGEMENT</p>
          <h1>Orders & Material</h1>
          <p className="page-description">
            Track issued, returned and pending shuttering material.
          </p>
        </div>

        <button
          className="new-order-btn"
          onClick={() => setShowModal(true)}
        >
          + New Material Issue
        </button>
      </div>

      {/* Summary */}
      <div className="order-summary">

        <div className="order-summary-card">
          <span>📋</span>
          <div>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>
        </div>

        <div className="order-summary-card">
          <span>🔄</span>
          <div>
            <p>Active Orders</p>
            <h2>
              {orders.filter(
                (order) => order.status === "Active"
              ).length}
            </h2>
          </div>
        </div>

        <div className="order-summary-card">
          <span>📦</span>
          <div>
            <p>Material With Customers</p>
            <h2>
              {orders.reduce(
                (total, order) =>
                  total +
                  order.items.reduce(
                    (sum, item) =>
                      sum + getWithCustomer(item),
                    0
                  ),
                0
              )}
            </h2>
          </div>
        </div>

        <div className="order-summary-card">
          <span>↩</span>
          <div>
            <p>Returned Material</p>
            <h2>
              {orders.reduce(
                (total, order) =>
                  total +
                  order.items.reduce(
                    (sum, item) => sum + item.returned,
                    0
                  ),
                0
              )}
            </h2>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="orders-toolbar">

        <div className="order-search">
          🔍
          <input
            type="text"
            placeholder="Search order, customer or site..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">All Orders</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

      </div>

      {/* Orders */}
      <div className="orders-card">

        <div className="orders-card-header">
          <div>
            <h2>Material Orders</h2>
            <p>
              Customer-wise material issue and return tracking.
            </p>
          </div>

          <span>{orders.length} Orders</span>
        </div>

        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>SITE</th>
                <th>DATE</th>
                <th>ITEMS</th>
                <th>WITH CUSTOMER</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => {

                const withCustomer = order.items.reduce(
                  (sum, item) =>
                    sum + getWithCustomer(item),
                  0
                );

                return (
                  <tr key={order.id}>

                    <td>
                      <strong className="order-id">
                        {order.id}
                      </strong>
                    </td>

                    <td>
                      <strong>{order.customer}</strong>
                    </td>

                    <td>{order.site}</td>

                    <td>{order.date}</td>

                    <td>
                      <span className="items-badge">
                        {order.items.length} Items
                      </span>
                    </td>

                    <td>
                      <strong className="with-customer">
                        {withCustomer}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={
                          order.status === "Active"
                            ? "order-active"
                            : "order-completed"
                        }
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-order-btn"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        View
                      </button>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="order-modal-header">

              <div>
                <span className="modal-order-id">
                  {selectedOrder.id}
                </span>

                <h2>{selectedOrder.customer}</h2>

                <p>{selectedOrder.site}</p>
              </div>

              <button
                className="close-order-modal"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>

            </div>

            <div className="material-details">

              <div className="material-header">
                <div>
                  <h3>Issued Material</h3>
                  <p>
                    Complete product and return details.
                  </p>
                </div>

                <button className="return-material-btn">
                  ↩ Record Return
                </button>
              </div>

              <div className="material-table-wrapper">

                <table className="material-table">

                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>SIZE</th>
                      <th>ISSUED</th>
                      <th>RETURNED</th>
                      <th>DAMAGED</th>
                      <th>WITH CUSTOMER</th>
                    </tr>
                  </thead>

                  <tbody>

                    {selectedOrder.items.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            <strong>
                              {item.product}
                            </strong>
                          </td>

                          <td>
                            {item.size ? (
                              <span className="size-tag">
                                {item.size}
                              </span>
                            ) : (
                              <span className="no-size-tag">
                                No Size
                              </span>
                            )}
                          </td>

                          <td>{item.issued}</td>

                          <td className="returned-number">
                            {item.returned}
                          </td>

                          <td className="damaged-number">
                            {item.damaged}
                          </td>

                          <td>
                            <strong className="remaining-number">
                              {getWithCustomer(item)}
                            </strong>
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="order-modal-footer">

              <button className="challan-button">
                📋 Generate Challan
              </button>

              <button className="bill-button">
                📄 Generate Bill
              </button>

              <button
                className="close-button"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* New Order Modal */}
      {showModal && (

        <div
          className="order-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="new-order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="order-modal-header">

              <div>
                <h2>New Material Issue</h2>
                <p>
                  Issue shuttering material to a customer/site.
                </p>
              </div>

              <button
                className="close-order-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <div className="new-order-form">

              <div className="form-group">
                <label>Customer *</label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select Customer
                  </option>
                  <option>ABC Construction</option>
                  <option>Sharma Builders</option>
                  <option>Raj Construction</option>
                </select>
              </div>

              <div className="form-group">
                <label>Site *</label>

                <input
                  type="text"
                  placeholder="Enter site location"
                />
              </div>

              <div className="form-group">
                <label>Issue Date *</label>

                <input
                  type="date"
                  defaultValue="2026-08-31"
                />
              </div>

              <div className="form-group">
                <label>Product *</label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select Product
                  </option>
                  <option>Setting Plate</option>
                  <option>Base Jack</option>
                  <option>Pin</option>
                  <option>Jack</option>
                </select>
              </div>

              <div className="form-group">
                <label>Size</label>

                <input
                  type="text"
                  placeholder="e.g. 3 Meter (Optional)"
                />
              </div>

              <div className="form-group">
                <label>Quantity *</label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                />
              </div>

            </div>

            <div className="order-modal-footer">

              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="issue-button">
                Issue Material
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;