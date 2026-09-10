import { useState } from "react";
import "./Customers.css";

function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: "ABC Construction",
      phone: "9876543210",
      site: "Sector 57, Gurugram",
      business: "Construction",
      totalBill: 85000,
      paid: 60000,
      pending: 25000,
      status: "Active",
      payments: [
        { date: "28 Aug 2026", amount: 20000 },
        { date: "20 Aug 2026", amount: 25000 },
        { date: "10 Aug 2026", amount: 15000 },
      ],
    },
    {
      id: 2,
      name: "Sharma Builders",
      phone: "9812345678",
      site: "Sohna Road, Gurugram",
      business: "Builder",
      totalBill: 120000,
      paid: 95000,
      pending: 25000,
      status: "Active",
      payments: [
        { date: "27 Aug 2026", amount: 35000 },
        { date: "15 Aug 2026", amount: 30000 },
        { date: "05 Aug 2026", amount: 30000 },
      ],
    },
    {
      id: 3,
      name: "Raj Construction",
      phone: "9988776655",
      site: "Manesar",
      business: "Construction",
      totalBill: 50000,
      paid: 50000,
      pending: 0,
      status: "Paid",
      payments: [
        { date: "25 Aug 2026", amount: 30000 },
        { date: "18 Aug 2026", amount: 20000 },
      ],
    },
  ];

  const formatMoney = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="customers-page">

      {/* Header */}
      <div className="customers-header">
        <div>
          <p className="page-label">CUSTOMER MANAGEMENT</p>
          <h1>Customers</h1>
          <p className="page-description">
            Manage customers, sites and payment history.
          </p>
        </div>

        <button className="add-customer-btn">
          + Add Customer
        </button>
      </div>

      {/* Summary */}
      <div className="customer-summary">

        <div className="customer-summary-card">
          <span>👥</span>
          <div>
            <p>Total Customers</p>
            <h2>{customers.length}</h2>
          </div>
        </div>

        <div className="customer-summary-card">
          <span>✓</span>
          <div>
            <p>Active Customers</p>
            <h2>
              {customers.filter(
                (customer) => customer.status === "Active"
              ).length}
            </h2>
          </div>
        </div>

        <div className="customer-summary-card">
          <span>₹</span>
          <div>
            <p>Total Billing</p>
            <h2>
              {formatMoney(
                customers.reduce(
                  (sum, customer) => sum + customer.totalBill,
                  0
                )
              )}
            </h2>
          </div>
        </div>

        <div className="customer-summary-card pending-card">
          <span>⏳</span>
          <div>
            <p>Total Pending</p>
            <h2>
              {formatMoney(
                customers.reduce(
                  (sum, customer) => sum + customer.pending,
                  0
                )
              )}
            </h2>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="customer-toolbar">

        <div className="customer-search">
          🔍
          <input
            type="text"
            placeholder="Search customer, phone or site..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">All Customers</option>
          <option value="active">Active</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

      </div>

      {/* Customer Table */}
      <div className="customers-card">

        <div className="customers-card-header">
          <div>
            <h2>Customer List</h2>
            <p>
              Customer billing and payment information.
            </p>
          </div>

          <span>{customers.length} Customers</span>
        </div>

        <div className="customer-table-wrapper">

          <table className="customer-table">

            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>PHONE</th>
                <th>SITE</th>
                <th>BUSINESS</th>
                <th>TOTAL BILL</th>
                <th>PAID</th>
                <th>PENDING</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr key={customer.id}>

                  <td>
                    <div className="customer-name">
                      <div className="customer-avatar">
                        {customer.name.charAt(0)}
                      </div>

                      <strong>{customer.name}</strong>
                    </div>
                  </td>

                  <td>{customer.phone}</td>

                  <td>{customer.site}</td>

                  <td>{customer.business}</td>

                  <td>
                    <strong>
                      {formatMoney(customer.totalBill)}
                    </strong>
                  </td>

                  <td className="paid-amount">
                    {formatMoney(customer.paid)}
                  </td>

                  <td className="pending-amount">
                    {formatMoney(customer.pending)}
                  </td>

                  <td>
                    <span
                      className={
                        customer.pending > 0
                          ? "status-active"
                          : "status-paid"
                      }
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-customer-btn"
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >

          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="customer-modal-header">

              <div className="customer-profile">

                <div className="large-avatar">
                  {selectedCustomer.name.charAt(0)}
                </div>

                <div>
                  <h2>{selectedCustomer.name}</h2>
                  <p>{selectedCustomer.phone}</p>
                </div>

              </div>

              <button
                className="close-customer-modal"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>

            </div>

            {/* Customer Info */}
            <div className="customer-info-grid">

              <div>
                <span>Site</span>
                <strong>{selectedCustomer.site}</strong>
              </div>

              <div>
                <span>Business</span>
                <strong>{selectedCustomer.business}</strong>
              </div>

              <div>
                <span>Total Bill</span>
                <strong>
                  {formatMoney(selectedCustomer.totalBill)}
                </strong>
              </div>

              <div>
                <span>Pending</span>
                <strong className="modal-pending">
                  {formatMoney(selectedCustomer.pending)}
                </strong>
              </div>

            </div>

            {/* Payment History */}
            <div className="payment-history">

              <div className="history-header">
                <div>
                  <h3>Payment History</h3>
                  <p>Previous payments received</p>
                </div>

                <button className="record-payment-btn">
                  + Record Payment
                </button>
              </div>

              {selectedCustomer.payments.map(
                (payment, index) => (

                  <div
                    className="payment-history-row"
                    key={index}
                  >

                    <div>
                      <strong>
                        {formatMoney(payment.amount)}
                      </strong>

                      <small>{payment.date}</small>
                    </div>

                    <span className="payment-received">
                      Received
                    </span>

                  </div>

                )
              )}

            </div>

            {/* Footer */}
            <div className="customer-modal-footer">

              <button className="bill-btn">
                📄 View Bill
              </button>

              <button className="challan-btn">
                📋 View Challan
              </button>

              <button className="close-btn"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Customers;