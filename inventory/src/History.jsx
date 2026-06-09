import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState("");

  useEffect(() => {
    fetch("https://ivmproject-1.onrender.com/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => setHistory([])); // safety fallback
  }, []);

  return (
    <div>
      <h1>Stock History</h1>

      {/* ✅ NO RECORDS FOUND */}
      {history.length === 0 ? (
        <p style={{ textAlign: "center", color: "red", background:"green",marginLeft:"100px",marginRight:"100px",marginTop: "20px" }}>
          No Records Found
        </p>
      ) : (
        <table className="tab" border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>Action</th>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((h) => (
              <tr key={h._id}>
                <td>{h.productName}</td>
                <td>{h.action}</td>

                <td>
                  <button
                    id="his"
                    onClick={() => setSelectedDetails(h.details)}
                  >
                    View
                  </button>
                </td>

                <td>{new Date(h.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* POPUP */}
      {selectedDetails !== "" && (
        <div className="popup">
          <h3>Stock Details</h3>

          <p style={{ whiteSpace: "pre-line" }}>
            {selectedDetails}
          </p>

          <button onClick={() => setSelectedDetails("")}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default History;