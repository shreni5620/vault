import React, { useState } from 'react';
import { BarChart2, LineChart, Calendar, Download } from 'lucide-react';
import './Analytics.css';

function Analytics() {
  const [timeRange, setTimeRange] = useState('month');

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
            <div className="y-axis">
              {['100k', '80k', '60k', '40k', '20k', '0'].map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="chart-content">
              <div className="chart-bars"></div>
              <div className="x-axis">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                  <span key={m}>{m}</span>
                ))}
              </div>
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
            {[
              { label: 'SUVs', value: '42.5%', height: '85%' },
              { label: 'Sedans', value: '32.5%', height: '65%' },
              { label: 'Trucks', value: '20%', height: '40%' },
              { label: 'Electric', value: '10%', height: '20%' },
              { label: 'Luxury', value: '5%', height: '10%' },
            ].map(({ label, value, height }) => (
              <div key={label} className="vehicle-type-item">
                <div
                  className="vehicle-type-bar"
                  style={{ height }}
                ></div>
                <span className="vehicle-type-label">{label}</span>
                <span className="vehicle-type-value">{value}</span>
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
              {[
                { label: 'Search', value: '45%', color: 'blue' },
                { label: 'Direct', value: '25%', color: 'green' },
                { label: 'Social', value: '20%', color: 'pink' },
                { label: 'Referral', value: '10%', color: 'yellow' },
              ].map(({ label, value, color }) => (
                <div key={label} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: color }}></div>
                  <span className="legend-label">{label}</span>
                  <span className="legend-value">{value}</span>
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
              <span>Growth</span>
            </div>
            {[
              { region: 'East Coast', listings: '3,245', growth: '+12.4%' },
              { region: 'West Coast', listings: '2,890', growth: '+8.7%' },
              { region: 'Midwest', listings: '1,932', growth: '-2.3%' },
              { region: 'South', listings: '2,541', growth: '+15.8%' },
              { region: 'Northwest', listings: '1,245', growth: '+5.1%' },
            ].map(({ region, listings, growth }) => (
              <div
                key={region}
                className="table-row"
              >
                <span>{region}</span>
                <span>{listings}</span>
                <span className={`growth-value ${growth.startsWith('+') ? 'positive' : 'negative'}`}>
                  {growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
