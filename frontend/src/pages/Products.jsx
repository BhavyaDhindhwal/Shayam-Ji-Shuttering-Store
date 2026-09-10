import { useEffect, useState } from "react";
import "./Products.css";

const API_URL = "http://localhost:5000/api/products";

function Products() {
  // ==========================================
  // STATES
  // ==========================================

  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [updating, setUpdating] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [stockFilter, setStockFilter] = useState("all");

  const [sizeFilter, setSizeFilter] = useState("allSizes");

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    unit: "piece",
    totalQuantity: "",
    rate: "",
    lowStockLimit: "10",
  });

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `Products fetch failed (${response.status})`
        );
      }

      let data = [];

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid JSON."
          );
        }
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid products data received."
        );
      }

      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);

      setError(
        err.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setFormData({
      name: "",
      size: "",
      unit: "piece",
      totalQuantity: "",
      rate: "",
      lowStockLimit: "10",
    });

    setEditingProduct(null);
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      size: product.size || "",
      unit: product.unit || "piece",
      totalQuantity:
        product.totalQuantity ?? "",
      rate: product.rate ?? "",
      lowStockLimit:
        product.lowStockLimit ?? 10,
    });

    setShowModal(true);
  };

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (
      formData.totalQuantity === "" ||
      Number(formData.totalQuantity) < 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          size:
            formData.size.trim() || null,
          unit:
            formData.unit || "piece",
          totalQuantity:
            Number(formData.totalQuantity),
          rate:
            formData.rate === ""
              ? 0
              : Number(formData.rate),
          lowStockLimit:
            formData.lowStockLimit === ""
              ? 10
              : Number(formData.lowStockLimit),
        }),
      });

      const responseText =
        await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to add product (${response.status})`
        );
      }

      alert(
        data.message ||
          "Product added successfully."
      );

      resetForm();
      setShowModal(false);

      await fetchProducts();
    } catch (err) {
      console.error(
        "Add product error:",
        err
      );

      alert(
        err.message ||
          "Unable to add product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editingProduct) {
      return;
    }

    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (
      formData.totalQuantity === "" ||
      Number(formData.totalQuantity) < 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(
        `${API_URL}/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),

            size:
              formData.size.trim() || null,

            unit:
              formData.unit || "piece",

            totalQuantity:
              Number(formData.totalQuantity),

            rate:
              formData.rate === ""
                ? 0
                : Number(formData.rate),

            lowStockLimit:
              formData.lowStockLimit === ""
                ? 10
                : Number(formData.lowStockLimit),
          }),
        }
      );

      const responseText =
        await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to update product (${response.status})`
        );
      }

      alert(
        data.message ||
          "Product updated successfully."
      );

      resetForm();
      setShowModal(false);

      await fetchProducts();
    } catch (err) {
      console.error(
        "Update product error:",
        err
      );

      alert(
        err.message ||
          "Unable to update product."
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (productId) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to remove this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/${productId}`,
        {
          method: "DELETE",
        }
      );

      const responseText =
        await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to delete product (${response.status})`
        );
      }

      alert(
        data.message ||
          "Product removed successfully."
      );

      await fetchProducts();
    } catch (err) {
      console.error(
        "Delete product error:",
        err
      );

      alert(
        err.message ||
          "Unable to remove product."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts =
    products.filter((product) => {
      const search =
        searchText.trim().toLowerCase();

      const matchesSearch =
        !search ||
        product.name
          ?.toLowerCase()
          .includes(search) ||
        product.size
          ?.toLowerCase()
          .includes(search);

      const available =
        Number(
          product.availableQuantity || 0
        );

      const issued =
        Number(
          product.issuedQuantity || 0
        );

      const lowLimit =
        Number(
          product.lowStockLimit || 10
        );

      let matchesStock = true;

      if (stockFilter === "available") {
        matchesStock = available > 0;
      }

      if (stockFilter === "issued") {
        matchesStock = issued > 0;
      }

      if (stockFilter === "low") {
        matchesStock = available <= lowLimit;
      }

      let matchesSize = true;

      if (sizeFilter === "none") {
        matchesSize = !product.size;
      } else if (sizeFilter !== "allSizes") {
        matchesSize =
          product.size
            ?.toLowerCase()
            .includes(
              sizeFilter.replace("m", "")
            );
      }

      return (
        matchesSearch &&
        matchesStock &&
        matchesSize
      );
    });

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalAvailable =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.availableQuantity || 0
        ),
      0
    );

  const totalIssued =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.issuedQuantity || 0
        ),
      0
    );

  const totalReturned =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.returnedQuantity || 0
        ),
      0
    );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="products-page">

      {/* HEADER */}

      <div className="products-header">

        <div>
          <p className="page-label">
            INVENTORY MANAGEMENT
          </p>

          <h1>
            Products & Stock
          </h1>

          <p className="page-description">
            Manage your shuttering material
            and stock levels.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={openAddModal}
        >
          + Add Product
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="product-summary">

        <div className="summary-card">

          <span className="summary-icon">
            📦
          </span>

          <div>
            <p>Total Products</p>
            <h2>
              {products.length}
            </h2>
          </div>

        </div>

        <div className="summary-card">

          <span className="summary-icon">
            ✓
          </span>

          <div>
            <p>Total Available</p>
            <h2>
              {totalAvailable}
            </h2>
          </div>

        </div>

        <div className="summary-card">

          <span className="summary-icon">
            ↗
          </span>

          <div>
            <p>Total Issued</p>
            <h2>
              {totalIssued}
            </h2>
          </div>

        </div>

        <div className="summary-card">

          <span className="summary-icon">
            ↩
          </span>

          <div>
            <p>Total Returned</p>
            <h2>
              {totalReturned}
            </h2>
          </div>

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="products-toolbar">

        <div className="search-box">

          🔍

          <input
            type="text"
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            placeholder="Search product..."
          />

        </div>

        <select
          value={stockFilter}
          onChange={(e) =>
            setStockFilter(
              e.target.value
            )
          }
        >

          <option value="all">
            All Products
          </option>

          <option value="available">
            Available
          </option>

          <option value="issued">
            Issued
          </option>

          <option value="low">
            Low Stock
          </option>

        </select>

        <select
          value={sizeFilter}
          onChange={(e) =>
            setSizeFilter(
              e.target.value
            )
          }
        >

          <option value="allSizes">
            All Sizes
          </option>

          <option value="3m">
            3 Meter
          </option>

          <option value="2.5m">
            2.5 Meter
          </option>

          <option value="1m">
            1 Meter
          </option>

          <option value="none">
            No Size
          </option>

        </select>

      </div>

      {/* INVENTORY */}

      <div className="products-card">

        <div className="table-heading">

          <div>

            <h2>
              Inventory
            </h2>

            <p>
              Track total, available,
              issued and returned material.
            </p>

          </div>

          <span className="product-count">
            {filteredProducts.length} Products
          </span>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="products-message">

            <div className="loading-icon">
              ⏳
            </div>

            <h3>
              Loading Products
            </h3>

            <p>
              Fetching inventory from database...
            </p>

          </div>

        )}

        {/* ERROR */}

        {!loading && error && (

          <div className="products-message error-message">

            <div className="empty-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Products
            </h3>

            <p>
              {error}
            </p>

            <button
              onClick={fetchProducts}
              className="retry-btn"
            >
              ↻ Retry
            </button>

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div className="products-message">

              <div className="empty-icon">
                📦
              </div>

              <h3>
                No Products Found
              </h3>

              <p>
                Add your first shuttering
                material to inventory.
              </p>

              <button
                className="empty-add-btn"
                onClick={openAddModal}
              >
                + Add Product
              </button>

            </div>

          )}

        {/* NO FILTER RESULTS */}

        {!loading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length === 0 && (

            <div className="products-message">

              <div className="empty-icon">
                🔍
              </div>

              <h3>
                No Matching Products
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

            </div>

          )}

        {/* TABLE */}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>PRODUCT</th>
                    <th>SIZE</th>
                    <th>TOTAL</th>
                    <th>AVAILABLE</th>
                    <th>ISSUED</th>
                    <th>RETURNED</th>
                    <th>DAMAGED</th>
                    <th>RATE</th>
                    <th>ACTION</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => {

                      const available =
                        Number(
                          product.availableQuantity ||
                            0
                        );

                      const lowLimit =
                        Number(
                          product.lowStockLimit ||
                            10
                        );

                      const isLowStock =
                        available <= lowLimit;

                      return (

                        <tr
                          key={
                            product._id
                          }
                        >

                          {/* PRODUCT */}

                          <td>

                            <div className="product-name">

                              <span className="product-image">
                                📦
                              </span>

                              <div>

                                <strong>
                                  {product.name}
                                </strong>

                                <small>
                                  {product.unit}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* SIZE */}

                          <td>

                            {product.size ? (

                              <span className="size-badge">
                                {product.size}
                              </span>

                            ) : (

                              <span className="no-size">
                                No Size
                              </span>

                            )}

                          </td>

                          {/* TOTAL */}

                          <td>

                            <strong>
                              {
                                product.totalQuantity
                              }
                            </strong>

                          </td>

                          {/* AVAILABLE */}

                          <td>

                            <span
                              className={
                                isLowStock
                                  ? "available-stock low-stock"
                                  : "available-stock"
                              }
                            >
                              {
                                product.availableQuantity
                              }
                            </span>

                            {isLowStock && (

                              <small className="low-stock-label">
                                Low
                              </small>

                            )}

                          </td>

                          {/* ISSUED */}

                          <td>

                            <span className="issued-stock">
                              {
                                product.issuedQuantity
                              }
                            </span>

                          </td>

                          {/* RETURNED */}

                          <td>

                            <span className="returned-stock">
                              {
                                product.returnedQuantity
                              }
                            </span>

                          </td>

                          {/* DAMAGED */}

                          <td>

                            <span className="damaged-stock">
                              {
                                product.damagedQuantity
                              }
                            </span>

                          </td>

                          {/* RATE */}

                          <td>

                            ₹
                            {Number(
                              product.rate || 0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </td>

                          {/* ACTION */}

                          <td>

                            <div className="action-buttons">

                              {/* VIEW */}

                              <button
                                type="button"
                                title="View"
                                onClick={() =>
                                  alert(
                                    `Product: ${
                                      product.name
                                    }\n\nSize: ${
                                      product.size ||
                                      "No Size"
                                    }\n\nUnit: ${
                                      product.unit
                                    }\n\nTotal: ${
                                      product.totalQuantity
                                    }\nAvailable: ${
                                      product.availableQuantity
                                    }\nIssued: ${
                                      product.issuedQuantity
                                    }\nReturned: ${
                                      product.returnedQuantity
                                    }\nDamaged: ${
                                      product.damagedQuantity
                                    }\nRate: ₹${
                                      product.rate ||
                                      0
                                    }`
                                  )
                                }
                              >
                                👁
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(product)
                                }
                              >
                                ✏
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                title="Delete"
                                disabled={
                                  deleting
                                }
                                onClick={() =>
                                  handleDelete(
                                    product._id
                                  )
                                }
                              >
                                🗑
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => {

            if (
              !saving &&
              !updating
            ) {
              setShowModal(false);
              resetForm();
            }

          }}
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>

                <p>
                  {editingProduct
                    ? "Update shuttering material details."
                    : "Add shuttering material to inventory."}
                </p>

              </div>

              <button
                type="button"
                className="close-btn"
                disabled={
                  saving ||
                  updating
                }
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                editingProduct
                  ? handleUpdateProduct
                  : handleAddProduct
              }
            >

              <div className="form-grid">

                {/* NAME */}

                <div className="form-group">

                  <label>
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Setting Plate"
                    required
                  />

                </div>

                {/* SIZE */}

                <div className="form-group">

                  <label>
                    Size
                  </label>

                  <input
                    type="text"
                    name="size"
                    value={
                      formData.size
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 3 Meter"
                  />

                  <small>
                    Optional — Pin, Jack,
                    Base Jack etc. can
                    be saved without size.
                  </small>

                </div>

                {/* UNIT */}

                <div className="form-group">

                  <label>
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={
                      formData.unit
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="piece">
                      Piece
                    </option>

                    <option value="meter">
                      Meter
                    </option>

                    <option value="set">
                      Set
                    </option>

                    <option value="kg">
                      Kg
                    </option>

                  </select>

                </div>

                {/* TOTAL QUANTITY */}

                <div className="form-group">

                  <label>
                    Total Quantity *
                  </label>

                  <input
                    type="number"
                    name="totalQuantity"
                    value={
                      formData.totalQuantity
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                    required
                  />

                </div>

                {/* RATE */}

                <div className="form-group">

                  <label>
                    Rate
                  </label>

                  <input
                    type="number"
                    name="rate"
                    value={
                      formData.rate
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                    placeholder="₹ 0"
                  />

                </div>

                {/* LOW STOCK */}

                <div className="form-group">

                  <label>
                    Low Stock Limit
                  </label>

                  <input
                    type="number"
                    name="lowStockLimit"
                    value={
                      formData.lowStockLimit
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  disabled={
                    saving ||
                    updating
                  }
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-btn"
                  disabled={
                    saving ||
                    updating
                  }
                >

                  {editingProduct
                    ? updating
                      ? "Updating..."
                      : "Update Product"
                    : saving
                    ? "Saving..."
                    : "Save Product"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;