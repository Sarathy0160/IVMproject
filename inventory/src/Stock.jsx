import { useEffect, useState } from "react";

function Stock() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://ivmproject-1.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  const clearForm = () => {
    setProductName("");
    setCategory("");
    setBrand("");
    setQuantity("");
    setPrice("");
    setEditId("");
  };

  const addProduct = async () => {
    await fetch("https://ivmproject-1.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        category,
        brand,
        quantity,
        price,
      }),
    });

    alert("Product Added");

    clearForm();
    setShowModal(false);
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setProductName(product.productName);
    setCategory(product.category);
    setBrand(product.brand);
    setQuantity(product.quantity);
    setPrice(product.price);

    setShowModal(true);
  };

  const updateProduct = async () => {
    await fetch(`https://ivmproject-1.onrender.com/api/products/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      productName,
      brand,
      category,
      quantity,
      price,
    }),
    });

    alert("Product Updated");

    clearForm();
    setShowModal(false);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await fetch(`https://ivmproject-1.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });

    alert("Product Deleted");

    fetchProducts();
  };
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

const filteredProducts = products.filter((p) => {
  const matchesSearch =
    p.productName.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || "").toLowerCase().includes(search.toLowerCase());

  const matchesBrand =
    brandFilter === "" || p.brand === brandFilter;

  return matchesSearch && matchesBrand;
});

 

  return (
    <div>
      <h1>Stock Management</h1>
          <select id="fil"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">☰ Filter</option>

            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
      {/* SEARCH */}
     <input
  id="search"
  type="text"
  placeholder="🔍 Search Product"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>



     

      {/* ADD BUTTON */}
      <button id="add" onClick={() => {
        clearForm();
        setShowModal(true);
      }}>+Add
      </button>
      
      <br />
        
      

      {/* POPUP MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="updbox">

            <h2>{editId ? "Edit Product" : "Add Product"}</h2>

            <input id="stockinpt"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <input id="stockinpt"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input id="stockinpt"
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            <input id="stockinpt"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <input id="stockinpt"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <div>
              <button id="save"
              onClick={editId ? updateProduct : addProduct}
            >
              {editId ? "Updated" : "Saved"}
            </button>

            <button id="can"onClick={() => setShowModal(false)}>
              Cancel
            </button>
            </div>

          </div>
        </div>
      )}
       

      {/* TABLE */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td>{p.productName}</td>
              <td>{p.category}</td>
              <td>{p.brand}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>{p.status}</td>
              <td>
                <button  id="edit"  onClick={() => editProduct(p)}>
                  🖊Edit
                </button>

                <button  id="delt" onClick={() => deleteProduct(p._id)}>
                  🗑️Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;