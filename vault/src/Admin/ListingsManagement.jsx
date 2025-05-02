import React, { useState } from 'react';
import {
  Search, Filter, CheckCircle, XCircle, Eye,
  Trash2, MoreVertical, ArrowUp, ArrowDown
} from 'lucide-react';
import './ListingsManagement.css';

function ListingsManagement() {
  const [filterStatus, setFilterStatus] = useState('all');

  const listingsData = [
    { id: 'LST-1001', vehicle: 'BMW X5', seller: 'John Smith', date: 'May 15, 2025', price: '$78,900', status: 'pending', featured: false },
    { id: 'LST-1002', vehicle: 'Tesla Model 3', seller: 'Sarah Johnson', date: 'May 14, 2025', price: '$42,500', status: 'approved', featured: true },
    { id: 'LST-1003', vehicle: 'Mercedes GLC', seller: 'Robert Williams', date: 'May 13, 2025', price: '$52,300', status: 'pending', featured: false },
    { id: 'LST-1004', vehicle: 'Audi Q7', seller: 'Michelle Davis', date: 'May 12, 2025', price: '$65,700', status: 'approved', featured: true },
    { id: 'LST-1005', vehicle: 'Toyota Camry', seller: 'David Wilson', date: 'May 11, 2025', price: '$28,500', status: 'rejected', featured: false },
    { id: 'LST-1006', vehicle: 'Ford F-150', seller: 'Jessica Brown', date: 'May 10, 2025', price: '$45,900', status: 'approved', featured: false },
  ];

  const filteredListings = listingsData.filter(listing =>
    filterStatus === 'all' || listing.status === filterStatus
  );

  const statusColor = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="listings-container">
      <div className="listings-header">
        <h1 className="listings-title">Listings Management</h1>
        <div className="breadcrumb">
          <a href="#" className="breadcrumb-link">Home</a> / Listings
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-value">42</p>
          <p className="stat-label">Total Listings</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">8</p>
          <p className="stat-label">Pending Review</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">28</p>
          <p className="stat-label">Approved</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">6</p>
          <p className="stat-label">Rejected</p>
        </div>
      </div>

      <div className="listings-controls">
        <div className="search-controls">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search listings..."
              className="search-input"
            />
          </div>
          <button className="filter-button">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
        <div className="status-filters">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`status-filter-button ${filterStatus === status ? 'active' : ''}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="listings-table">
          <thead>
            <tr className="table-header-row">
              {['ID', 'Vehicle', 'Seller', 'Date', 'Price', 'Status', 'Featured', 'Actions'].map(header => (
                <th key={header} className="table-header-cell">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredListings.map(listing => (
              <tr key={listing.id} className="table-row">
                <td>{listing.id}</td>
                <td>{listing.vehicle}</td>
                <td>{listing.seller}</td>
                <td>{listing.date}</td>
                <td>{listing.price}</td>
                <td>
                  <span className={`status-badge ${listing.status}`}>
                    {listing.status}
                  </span>
                </td>
                <td className="featured-cell">
                  {listing.featured
                    ? <span className="featured-badge">Featured</span>
                    : <span className="not-featured">-</span>}
                </td>
                <td>
                  <div className="action-buttons">
                    {listing.status === 'pending' && (
                      <>
                        <button className="action-button approve" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="action-button reject" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button className="action-button view" title="View">
                      <Eye size={16} />
                    </button>
                    {!listing.featured && listing.status === 'approved' && (
                      <button className="action-button feature" title="Feature">
                        <ArrowUp size={16} />
                      </button>
                    )}
                    {listing.featured && (
                      <button className="action-button unfeature" title="Unfeature">
                        <ArrowDown size={16} />
                      </button>
                    )}
                    <button className="action-button delete" title="Delete">
                      <Trash2 size={16} />
                    </button>
                    <button className="action-button more" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="pagination-info">Showing 1–6 of 42 listings</span>
        <div className="pagination-controls">
          <button className="pagination-button" disabled>Previous</button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-button">7</button>
          <button className="pagination-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default ListingsManagement;
