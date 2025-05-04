import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "#fff7e0",
  Approved: "#e6f9ee",
  Rejected: "#fdeaea",
};

const statusTextColors = {
  Pending: "#b38b00",
  Approved: "#2e8b57",
  Rejected: "#d32f2f",
};

const AdminTestDriveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const fetchRequests = () => {
    axios.get("http://localhost:3000/api/admin/test-drives")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/wishlist/getWishListData");
      setData(result.data.wishListData);
    };
    fetchData();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`http://localhost:3000/api/test-drives/${id}/${action}`);
      fetchRequests();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filtered = requests.filter(r =>
    (r.car || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.customer || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", padding: 32, background: "#f4f7fb", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 20, fontSize: 28, color: "#2d2d2d" }}>Admin Dashboard</h1>

      {/* Test Drive Requests */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>Test Drive Requests</h2>
          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 14,
              width: 240
            }}
          />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0f2f5", textAlign: "left" }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Car</th>
              <th style={{ padding: 10 }}>Customer</th>
              <th style={{ padding: 10 }}>Date</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Contact</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, idx) => (
              <tr key={req.id || idx} style={{ borderBottom: "1px solid #eee", backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: 10 }}>td-{String(idx + 1).padStart(3, "0")}</td>
                <td style={{ padding: 10, fontWeight: 600, color: "#2d6cdf" }}>{req.car}</td>
                <td style={{ padding: 10 }}>{req.customer}</td>
                <td style={{ padding: 10 }}>{new Date(req.date).toLocaleString()}</td>
                <td style={{ padding: 10 }}>
                  <span style={{
                    background: statusColors[req.status] || "#eee",
                    color: statusTextColors[req.status] || "#333",
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontWeight: 500,
                    display: "inline-block"
                  }}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: 10 }}>{req.contact}</td>
                <td style={{ padding: 10 }}>
                  <button
                    style={{
                      background: "#e3f0ff",
                      border: "none",
                      borderRadius: 5,
                      padding: "4px 8px",
                      marginRight: 4,
                      cursor: "pointer"
                    }}
                    title="View"
                    onClick={() => alert(JSON.stringify(req, null, 2))}
                  >👁️</button>
                  {req.status && req.status.toLowerCase() === "pending" && (
                    <>
                      <button
                        style={{
                          background: "#e6f9ee",
                          border: "none",
                          borderRadius: 5,
                          padding: "4px 8px",
                          marginRight: 4,
                          cursor: "pointer"
                        }}
                        title="Approve"
                        onClick={() => handleAction(req.id, "approved")}
                      >✔️</button>
                      <button
                        style={{
                          background: "#fdeaea",
                          border: "none",
                          borderRadius: 5,
                          padding: "4px 8px",
                          cursor: "pointer"
                        }}
                        title="Reject"
                        onClick={() => handleAction(req.id, "rejected")}
                      >❌</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wishlist */}
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        marginTop: 40,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>User Wishlist</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0f2f5", textAlign: "left" }}>
              <th style={{ padding: 10 }}>#</th>
              <th style={{ padding: 10 }}>User ID</th>
              <th style={{ padding: 10 }}>Vehicle ID</th>
              <th style={{ padding: 10 }}>Name</th>
              <th style={{ padding: 10 }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee", backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: 10 }}>{idx + 1}</td>
                <td style={{ padding: 10 }}>{item.userId}</td>
                <td style={{ padding: 10 }}>{item.vehicleId}</td>
                <td style={{ padding: 10, fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: 10 }}>{item.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestDriveRequests;
