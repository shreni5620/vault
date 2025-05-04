import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VehiclesList.css'; // Reuse the same CSS for consistent styling
import { API_ENDPOINTS } from '../config/api';

function VehiclesList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', model: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const res = await axios.get(API_ENDPOINTS.CAR);
    setCars(res.data.data || []); // Adjust according to your backend response
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      name: form.name,
      model: form.model,
      price: Number(String(form.price).replace(/,/g, ""))
    };
    if (editingId) {
      await axios.put(`${API_ENDPOINTS.CAR}/${editingId}`, carData);
    } else {
      await axios.post(API_ENDPOINTS.CAR, carData);
    }
    setForm({ name: '', model: '', price: '' });
    setEditingId(null);
    fetchCars();
  };

  const handleEdit = (car) => {
    setForm({ name: car.name, model: car.model, price: car.price });
    setEditingId(car._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await axios.delete(`${API_ENDPOINTS.CAR}/${id}`);
      fetchCars();
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="admin-users-container">
      <h2>Manage Vehicles</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
        <input
          name="name"
          placeholder="Car Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ flex: 1, padding: 8 }}
        />
        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          required
          style={{ flex: 1, padding: 8 }}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" className="block-button">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="delete-button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', model: '', price: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>
                <button className="block-button" onClick={() => handleEdit(car)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(car._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehiclesList;
