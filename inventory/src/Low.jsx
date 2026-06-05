import { useEffect, useState } from "react";

function Low() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const lowProducts = data.filter(
          (p) => Number(p.quantity) < 10
        );

        setProducts(lowProducts);
      });
  }, []);

  return (
    <div>
      <h1>Low Stock Alert</h1>

      <h3 id="h">
        Total Low Stock Products:<h2 id="r"> {products.length}</h2>
      </h3>

      <table className="tab" border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.productName}</td>
              <td>{p.brand}</td>
              <td>{p.category}</td>
              <td className="low-stock">
                {p.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <h3 id="h3">No Low Stock Products</h3>
      )}
    </div>
  );
}

export default Low;