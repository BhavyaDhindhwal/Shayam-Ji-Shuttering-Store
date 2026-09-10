import { useState } from "react";
import "./Payments.css";

function Payments() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const payments = [
    {
      id: "PAY-001",
      customer: "ABC Construction",
      phone: "9876543210",
      bill: "INV-001",
      totalBill: 85000,
      paid: 60000,
      pending: 25000,
      lastPayment: "28 Aug 2026",
      history: [
        { date: "28 Aug 2026", amount: 20000 },
        { date: "20 Aug 2026", amount: 25000 },
        { date: "10 Aug 2026", amount: 15000 },
      ],
    },
    {
      id: "PAY-002",
      customer: "Sharma Builders",
      phone: "9812345678",
      bill: "INV-002",
      totalBill: 120000,
      paid: 95000,
      pending: 25000,
      lastPayment: "27 Aug 2026",
      history: [
        { date: "27 Aug 2026", amount: 35000 },
        { date: "15 Aug 2026", amount: 30000 },
        { date: "05 Aug 2026", amount: 30000 },
      ],
    },
    {
      id: "PAY-003",
      customer: "Raj Construction",
      phone: "9988776655",
      bill: "INV-003",
      totalBill: 50000,
      paid: 50000,
      pending: 0,
      lastPayment: "25 Aug 2026",
      history: [
        { date: "25 Aug 2026", amount: 30000 },
        { date: "18 Aug 2026", amount: 20000 },
      ],
    },
  ];

  const money = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const totalBilling = payments.reduce(
    (sum, item) => sum + item.totalBill,
    0
  );

  const totalReceived = payments.reduce(
    (sum, item) => sum + item.paid,
    0
  );

  const totalPending = payments.reduce(
    (sum, item) => sum + item.pending,
    0
  );

  return (
    <div className="payments-page">

      {/* HEADER */}
      <div className="payments-header">
        <div>
          <p className="page-label">PAYMENT MANAGEMENT</p>
          <h1>Payments</h1>
          <p className="page-description">
            Track customer payments, pending amounts and payment history.
          </p>
        </div>

        <button
          className="record-payment-main"
          onClick={() => setShowPaymentModal(true)}
        >
          + Record Payment
        </button>
      </div>

      {/* SUMMARY */}
      <div className="payment-summary-grid">

        <div className="payment-summary-card">
          <span>₹</span>
          <div>
            <p>Total Billing</p>
            <h2>{money(totalBilling)}</h2>
          </div>
        </div>

        <div className="payment-summary-card received">
          <span>✓</span>
          <div>
            <p>Total Received</p>
            <h2>{money(totalReceived)}</h2>
          </div>
        </div>

        <div className="payment-summary-card pending">
          <span>⏳</span>
          <div>
            <p>Total Pending</p>
            <h2>{money(totalPending)}</h2>
          </div>
        </div>

        <div className="payment-summary-card">
          <span>📅</span>
          <div>
            <p>Customers With Pending</p>
            <h2>
              {payments.filter(
                (item) => item.pending > 0
              ).length}
            </h2>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="payments-toolbar">

        <div className="payment-search">
          🔍
          <input
            type="text"
            placeholder="Search customer, invoice or phone..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Fully Paid</option>
        </select>

      </div>

      {/* PAYMENT TABLE */}
      <div className="payments-card">

        <div className="payments-card-header">
          <div>
            <h2>Customer Payments</h2>
            <p>
              Billing, received and pending payment details.
            </p>
          </div>

          <span>{payments.length} Records</span>
        </div>

        <div className="payments-table-wrapper">

          <table className="payments-table">

            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>INVOICE</th>
                <th>TOTAL BILL</th>
                <th>RECEIVED</th>
                <th>PENDING</th>
                <th>LAST PAYMENT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr key={payment.id}>

                  <td>
                    <div className="payment-customer">
                      <div className="payment-avatar">
                        {payment.customer.charAt(0)}
                      </div>

                      <div>
                        <strong>{payment.customer}</strong>
                        <small>{payment.phone}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="invoice-tag">
                      {payment.bill}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {money(payment.totalBill)}
                    </strong>
                  </td>

                  <td className="received-text">
                    {money(payment.paid)}
                  </td>

                  <td className="pending-text">
                    {money(payment.pending)}
                  </td>

                  <td>{payment.lastPayment}</td>

                  <td>
                    <span
                      className={
                        payment.pending > 0
                          ? "payment-pending"
                          : "payment-paid"
                      }
                    >
                      {payment.pending > 0
                        ? "Pending"
                        : "Paid"}
                    </span>
                  </td>

                  <td>

                    <button
                      className="payment-view-btn"
                      onClick={() =>
                        setSelectedCustomer(payment)
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

      {/* CUSTOMER PAYMENT HISTORY */}
      {selectedCustomer && (

        <div
          className="payment-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >

          <div
            className="payment-history-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="payment-modal-header">

              <div>
                <p>PAYMENT DETAILS</p>
                <h2>{selectedCustomer.customer}</h2>
                <span>{selectedCustomer.phone}</span>
              </div>

              <button
                className="payment-close"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>

            </div>

            {/* BILL SUMMARY */}
            <div className="bill-summary">

              <div>
                <span>Total Bill</span>
                <strong>
                  {money(selectedCustomer.totalBill)}
                </strong>
              </div>

              <div>
                <span>Received</span>
                <strong className="received-text">
                  {money(selectedCustomer.paid)}
                </strong>
              </div>

              <div>
                <span>Pending</span>
                <strong className="pending-text">
                  {money(selectedCustomer.pending)}
                </strong>
              </div>

            </div>

            {/* HISTORY */}
            <div className="payment-history-section">

              <div className="history-title">
                <div>
                  <h3>Payment History</h3>
                  <p>Previous payments received from customer.</p>
                </div>

                <button
                  className="record-small-btn"
                  onClick={() => setShowPaymentModal(true)}
                >
                  + Add Payment
                </button>
              </div>

              {selectedCustomer.history.map(
                (item, index) => (

                  <div
                    className="payment-history-item"
                    key={index}
                  >

                    <div className="history-payment-icon">
                      ₹
                    </div>

                    <div className="history-payment-info">
                      <strong>
                        {money(item.amount)}
                      </strong>

                      <small>{item.date}</small>
                    </div>

                    <span className="received-badge">
                      Received
                    </span>

                  </div>

                )
              )}

            </div>

            {/* DOCUMENTS */}
            <div className="payment-documents">

              <button>
                📄 View Bill
              </button>

              <button>
                📋 View Challan
              </button>

              {selectedCustomer.pending > 0 && (
                <button className="reminder-btn">
                  🔔 Send Payment Reminder
                </button>
              )}

            </div>

          </div>

        </div>

      )}

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && (

        <div
          className="payment-modal-overlay"
          onClick={() => setShowPaymentModal(false)}
        >

          <div
            className="record-payment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="payment-modal-header">

              <div>
                <p>PAYMENT ENTRY</p>
                <h2>Record Payment</h2>
              </div>

              <button
                className="payment-close"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>

            </div>

            <div className="record-payment-form">

              <div className="payment-form-group">
                <label>Customer *</label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select Customer
                  </option>

                  {payments.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.customer}
                    </option>
                  ))}
                </select>
              </div>

              <div className="payment-form-group">
                <label>Payment Amount *</label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                />
              </div>

              <div className="payment-form-group">
                <label>Payment Date *</label>

                <input
                  type="date"
                  defaultValue="2026-08-31"
                />
              </div>

              <div className="payment-form-group">
                <label>Payment Mode</label>

                <select defaultValue="Cash">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                </select>
              </div>

              <div className="payment-form-group full-width">
                <label>Notes</label>

                <textarea
                  placeholder="Optional payment note..."
                  rows="3"
                ></textarea>
              </div>

            </div>

            <div className="record-payment-footer">

              <button
                className="cancel-payment-btn"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>

              <button className="save-payment-btn">
                Save Payment
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Payments;