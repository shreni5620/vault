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

  useEffect(() => {
    // Fetch recent vehicles from backend
    const fetchRecentVehicles = async () => {
      try {
        const res = await fetch('http://localhost:3000/car');
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

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <span className="dashboard-date-range">Last 30 days</span>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-cards">
        {metrics.map((m, i) => (
          <div className={`dashboard-card ${m.trendType}`} key={i}>
            <div className="card-icon">{m.icon}</div>
            <div className="card-title">{m.title}</div>
            <div className="card-value">{m.value}</div>
            <div className={`card-trend ${m.trendType}`}>
              <span>{m.trend}</span> {m.description}
            </div>
          </div>
        ))}
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
          <div className="chart-bars-container">
            {[
              { label: 'Jan', height: '40%' },
              { label: 'Feb', height: '65%' },
              { label: 'Mar', height: '50%' },
              { label: 'Apr', height: '75%' },
              { label: 'May', height: '85%' },
              { label: 'Jun', height: '60%' },
            ].map((bar, idx) => (
              <div key={idx} className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: bar.height }}></div>
                <span className="chart-label">{bar.label}</span>
              </div>
            ))}
          </div>
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
