import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  UserCheck,
  Car,
  Users,
} from 'lucide-react';
import './DashboardHome.css';
import { API_ENDPOINTS } from '../config/api';
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const metrics = [
  {
    icon: <Car size={28} />, title: 'Total Vehicles', value: '1,234', trend: '+12.5%', trendType: 'up', description: 'from last month',
  },
  {
    icon: <Users size={28} />, title: 'Active Users', value: '567', trend: '+8.2%', trendType: 'up', description: 'from last month',
  },
  {
    icon: <DollarSign size={28} />, title: 'Total Revenue', value: '$78,900', trend: '+5.7%', trendType: 'up', description: 'from last month',
  },
  {
    icon: <Activity size={28} />, title: 'Pending Approvals', value: '23', trend: '-3.2%', trendType: 'down', description: 'from last month',
  },
];

function DashboardHome() {
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({
    totalVehicles: 0,
    activeUsers: 0,
    totalRevenue: 0,
    pendingApprovals: 0
  });
  const [monthlyData, setMonthlyData] = useState({ labels: [], data: [] });

  useEffect(() => {
    // Fetch recent vehicles from backend
    const fetchRecentVehicles = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.CAR);
        const data = await res.json();
        // Assuming your backend returns { data: [...] }
        setRecentVehicles(data.data.slice(-5).reverse()); // Show last 5 added vehicles, most recent first
      } catch (err) {
        setRecentVehicles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentVehicles();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/overview")
      .then(res => setOverview(res.data))
      .catch(err => console.error("Failed to fetch overview:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/monthly-listings")
      .then(res => setMonthlyData(res.data))
      .catch(err => console.error("Failed to fetch monthly listings:", err));
  }, []);

  const chartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Listings',
        data: monthlyData.data,
        backgroundColor: '#2d6cdf',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <span className="dashboard-date-range">Last 30 days</span>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon"><Car size={28} /></div>
          <div className="card-title">Total Vehicles</div>
          <div className="card-value">{overview.totalVehicles}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon"><Users size={28} /></div>
          <div className="card-title">Active Users</div>
          <div className="card-value">{overview.activeUsers}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon"><DollarSign size={28} /></div>
          <div className="card-title">Total Revenue</div>
          <div className="card-value">${overview.totalRevenue}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon"><Activity size={28} /></div>
          <div className="card-title">Pending Approvals</div>
          <div className="card-value">{overview.pendingApprovals}</div>
        </div>
      </div>

      {/* Charts + Table */}
      <div className="dashboard-content">
        {/* Chart Placeholder */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Monthly Listings</h3>
            <select className="chart-select">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          <Bar data={chartData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }} />
        </div>

        {/* Recent Vehicles Table */}
        <div className="table-card">
          <div className="table-header">
            <h3 className="table-title">Recent Vehicles</h3>
            <button className="view-all-button">View All</button>
          </div>
          <table className="vehicles-table">
            <thead>
              <tr className="table-header-row">
                <th>ID</th>
                <th>Model</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>Loading...</td>
                </tr>
              ) : recentVehicles.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No recent vehicles to display.</td>
                </tr>
              ) : (
                recentVehicles.map((vehicle, idx) => (
                  <tr key={vehicle._id || idx} className="table-row">
                    <td>{vehicle._id || idx + 1}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.price}</td>
                    <td>
                      <span className={`status-badge ${vehicle.status || "active"}`}>
                        {vehicle.status || "N/A"}
                      </span>
                    </td>
                    <td>
                      {vehicle.listingDate
                        ? new Date(vehicle.listingDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
