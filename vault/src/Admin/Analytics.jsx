import React, { useState, useEffect } from 'react';
import { BarChart2, LineChart, Calendar, Download } from 'lucide-react';
import './Analytics.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import axios from "axios";

function Analytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [viewsData, setViewsData] = useState({ labels: [], data: [] });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [userAcquisition, setUserAcquisition] = useState([]);
  const [regionPerformance, setRegionPerformance] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    vehicles: 0,
    testDrives: 0,
    views: 0,
    wishlist: 0
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/analytics/vehicle-views")
      .then(res => setViewsData(res.data))
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/analytics/top-vehicle-types")
      .then(res => setVehicleTypes(res.data))
      .catch(err => console.error("Failed to fetch vehicle types:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/analytics/user-acquisition")
      .then(res => setUserAcquisition(res.data))
      .catch(err => console.error("Failed to fetch user acquisition:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/analytics/region-performance")
      .then(res => setRegionPerformance(res.data))
      .catch(err => console.error("Failed to fetch region performance:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch stats:", err));
  }, []);

  const chartData = {
    labels: viewsData.labels,
    datasets: [
      {
        label: 'Vehicle Views',
        data: viewsData.data,
        backgroundColor: '#2d6cdf',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1 className="analytics-title">Analytics & Reporting</h1>
        <div className="breadcrumb">
          <a href="#" className="breadcrumb-link">Home</a>
          <span>/</span>
          <span>Analytics</span>
        </div>
      </div>
      {/* Stats Cards Section */}
      <div className="stats-cards" style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <div className="stat-card" style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 4px #0001', flex: 1, textAlign: 'center' }}>
          <h4>Users</h4>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card" style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 4px #0001', flex: 1, textAlign: 'center' }}>
          <h4>Vehicles</h4>
          <p>{stats.vehicles}</p>
        </div>
        <div className="stat-card" style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 4px #0001', flex: 1, textAlign: 'center' }}>
          <h4>Test Drives</h4>
          <p>{stats.testDrives}</p>
        </div>
        <div className="stat-card" style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 4px #0001', flex: 1, textAlign: 'center' }}>
          <h4>Views</h4>
          <p>{stats.views}</p>
        </div>
        <div className="stat-card" style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 4px #0001', flex: 1, textAlign: 'center' }}>
          <h4>Wishlist</h4>
          <p>{stats.wishlist}</p>
        </div>
      </div>

      <div className="analytics-controls">
        <div className="time-range-buttons">
          {['week', 'month', 'quarter', 'year'].map(range => (
            <button
              key={range}
              className={`time-range-button ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <div className="date-range">
          <div className="date-input">
            <Calendar size={16} />
            <input
              type="text"
              placeholder="May 1, 2025"
              className="date-picker"
            />
          </div>
          <span className="date-separator">to</span>
          <div className="date-input">
            <Calendar size={16} />
            <input
              type="text"
              placeholder="May 31, 2025"
              className="date-picker"
            />
          </div>
          <button className="export-button">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Traffic Overview */}
        <div className="analytics-card traffic-overview">
          <div className="card-header">
            <div>
              <h3 className="card-title">Traffic Overview</h3>
              <p className="card-subtitle">Total vehicle views and leads</p>
            </div>
            <div className="chart-controls">
              {['Views', 'Leads', 'Conversions'].map((label, i) => (
                <button
                  key={i}
                  className={`chart-button ${i === 0 ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <Bar data={chartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }} />
            <div className="y-axis">
              {['100k', '80k', '60k', '40k', '20k', '0'].map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="x-axis">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Vehicle Types */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Vehicle Types</h3>
              <p className="card-subtitle">Most viewed categories</p>
            </div>
            <div className="chart-icons">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="vehicle-types">
            {vehicleTypes.map(({ _id, count }) => (
              <div key={_id} className="vehicle-type-item">
                <div
                  className="vehicle-type-bar"
                  style={{ height: `${(count / Math.max(...vehicleTypes.map(v => v.count)) * 100)}%` }}
                ></div>
                <span className="vehicle-type-label">{_id}</span>
                <span className="vehicle-type-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Acquisition */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">User Acquisition</h3>
              <p className="card-subtitle">How users find us</p>
            </div>
            <div className="chart-icons">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="acquisition-chart">
            <div className="donut-chart">
              <span className="donut-label">Donut Chart</span>
            </div>
            <div className="acquisition-legend">
              {userAcquisition.map(({ _id, count }) => (
                <div key={_id} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: _id === 'Search' ? 'blue' : _id === 'Direct' ? 'green' : _id === 'Social' ? 'pink' : 'yellow' }}></div>
                  <span className="legend-label">{_id}</span>
                  <span className="legend-value">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Regional Performance</h3>
              <p className="card-subtitle">Listings by region</p>
            </div>
            <div className="chart-icons">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="regional-table">
            <div className="table-header">
              <span>Region</span>
              <span>Listings</span>
            </div>
            {regionPerformance.map(({ _id, listings }) => (
              <div
                key={_id}
                className="table-row"
              >
                <span>{_id}</span>
                <span>{listings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
