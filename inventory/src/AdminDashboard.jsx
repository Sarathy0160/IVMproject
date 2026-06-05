import { useEffect, useState } from "react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, p) => sum + Number(p.quantity),
    0
  );

  const lowStockItems = products.filter(
    (p) => Number(p.quantity) < 10
  ).length;

  const totalValue = products.reduce(
    (sum, p) =>
      sum + Number(p.quantity) * Number(p.price),
    0
  );

  return (
    <div className="content">
      <h1>Inventory Dashboard</h1>

      <div className="dash">

        <div className="card">
          <h2>{totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="card">
          <h2>{totalQuantity}</h2>
          <p>Total Quantity</p>
        </div>

        <div className="card">
          <h2>{lowStockItems}</h2>
          <p>Low Stock Items</p>
        </div>

        <div className="card">
          <h2>₹{totalValue}</h2>
          <p>Total Inventory Value</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;