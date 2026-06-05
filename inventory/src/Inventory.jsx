import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
const exportInventory = () => {
  window.open(
    "http://ivmproject.onrender.com/api/export"
  );
};
  return (
    <div>
      <h1>Inventory</h1>

      <table class="tab "border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.productName}</td>
              <td>{p.category}</td>
              <td>{p.brand}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;