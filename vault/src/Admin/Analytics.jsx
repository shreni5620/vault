import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Analytics = () => {
  // States for each graph's data
  const [userReg, setUserReg] = useState({ labels: [], data: [] });
  const [carPosts, setCarPosts] = useState({ labels: [], data: [] });
  const [comparedCars, setComparedCars] = useState({ labels: [], data: [] });
  const [accessorySuggestions, setAccessorySuggestions] = useState({ labels: [], data: [] });
  const [testDrives, setTestDrives] = useState({ labels: [], data: [] });

  // Example: Fetch data from backend (replace URLs with your real endpoints)
  useEffect(() => {
    // Monthly User Registrations
    fetch('http://localhost:3000/api/admin/analytics/monthly-user-registrations')
      .then(res => res.json()).then(res => setUserReg(res));
    // Monthly Car Posts by Admin
    fetch('http://localhost:3000/api/admin/analytics/monthly-car-posts')
      .then(res => res.json()).then(res => setCarPosts(res));
    // Top Compared Cars
    fetch('http://localhost:3000/api/admin/analytics/top-compared-cars')
      .then(res => res.json()).then(res => setComparedCars(res));
    // Accessory Suggestions by Popularity
    fetch('http://localhost:3000/api/admin/analytics/accessory-suggestions')
      .then(res => res.json()).then(res => setAccessorySuggestions(res));
    // Test Drive Requests Over Time
    fetch('http://localhost:3000/api/admin/analytics/test-drive-requests')
      .then(res => res.json()).then(res => setTestDrives(res));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Analytics & Reporting</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h4>Monthly User Registrations</h4>
          <Line data={{
            labels: userReg.labels,
            datasets: [{ label: 'Users', data: userReg.data, backgroundColor: '#2d6cdf', borderColor: '#2d6cdf' }]
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h4>Monthly Car Posts by Admin</h4>
          <Bar data={{
            labels: carPosts.labels,
            datasets: [{ label: 'Car Posts', data: carPosts.data, backgroundColor: '#4caf50' }]
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h4>Top Compared Cars</h4>
          <Bar data={{
            labels: comparedCars.labels,
            datasets: [{ label: 'Comparisons', data: comparedCars.data, backgroundColor: '#ff9800' }]
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h4>Accessory Suggestions by Popularity</h4>
          <Bar data={{
            labels: accessorySuggestions.labels,
            datasets: [{ label: 'Suggestions', data: accessorySuggestions.data, backgroundColor: '#9c27b0' }]
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h4>Test Drive Requests Over Time</h4>
          <Line data={{
            labels: testDrives.labels,
            datasets: [{ label: 'Test Drives', data: testDrives.data, backgroundColor: '#e91e63', borderColor: '#e91e63' }]
          }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;