import React, { useState } from 'react';
import { Search, Filter, Plus, Download, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import './VehiclesList.css';

function VehiclesList() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Mock vehicle data
  const vehicles = [
    { 
      id: 'VH-2345', 
      model: 'BMW X5', 
      year: 2025,
      type: 'SUV',
      price: '$78,900', 
      status: 'active',
      mileage: '12,500 km',
      owner: 'John Smith',
      lastUpdated: 'May 15, 2025'
    },
    { 
      id: 'VH-2344', 
      model: 'Tesla Model 3', 
      year: 2024,
      type: 'Car',
      price: '$42,500', 
      status: 'active',
      mileage: '5,200 km',
      owner: 'Sarah Johnson',
      lastUpdated: 'May 14, 2025'
    },
    { 
      id: 'VH-2343', 
      model: 'Mercedes GLC', 
      year: 2025,
      type: 'SUV',
      price: '$52,300', 
      status: 'inactive',
      mileage: '8,700 km',
      owner: 'Robert Williams',
      lastUpdated: 'May 13, 2025'
    },
    { 
      id: 'VH-2342', 
      model: 'Audi Q7', 
      year: 2023,
      type: 'SUV',
      price: '$65,700', 
      status: 'active',
      mileage: '22,150 km',
      owner: 'Michelle Davis',
      lastUpdated: 'May 12, 2025'
    },
    { 
      id: 'VH-2341', 
      model: 'Toyota Camry', 
      year: 2024,
      type: 'Car',
      price: '$28,500', 
      status: 'inactive',
      mileage: '15,300 km',
      owner: 'David Wilson',
      lastUpdated: 'May 11, 2025'
    },
    { 
      id: 'VH-2340', 
      model: 'Ford F-150', 
      year: 2025,
      type: 'Truck',
      price: '$45,900', 
      status: 'active',
      mileage: '7,800 km',
      owner: 'Jessica Brown',
      lastUpdated: 'May 10, 2025'
    },
    { 
      id: 'VH-2339', 
      model: 'Honda Accord', 
      year: 2024,
      type: 'Car',
      price: '$32,700', 
      status: 'active',
      mileage: '9,500 km',
      owner: 'Thomas Miller',
      lastUpdated: 'May 9, 2025'
    },
  ];

  return (
    <div className="vehicles-container">
      <div className="page-header">
        <h1 className="page-title">Vehicle Inventory</h1>
        <div className="breadcrumb">
          <a href="#">Home</a>
          <span className="breadcrumb-separator">/</span>
          <span>Vehicles</span>
        </div>
      </div>

      <div className="actions-container">
        <div className="filters-container">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search vehicles..." className="search-input" />
          </div>
          <button className="filter-button">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
        <div className="actions-buttons">
          <button className="export-button">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="add-vehicle-button">
            <Plus size={18} />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab-button ${selectedTab === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedTab('all')}
          >
            All Vehicles
          </button>
          <button 
            className={`tab-button ${selectedTab === 'cars' ? 'active' : ''}`}
            onClick={() => setSelectedTab('cars')}
          >
            Cars
          </button>
          <button 
            className={`tab-button ${selectedTab === 'suvs' ? 'active' : ''}`}
            onClick={() => setSelectedTab('suvs')}
          >
            SUVs
          </button>
          <button 
            className={`tab-button ${selectedTab === 'trucks' ? 'active' : ''}`}
            onClick={() => setSelectedTab('trucks')}
          >
            Trucks
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Year</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles
              .filter(vehicle => {
                if (selectedTab === 'all') return true;
                if (selectedTab === 'cars') return vehicle.type === 'Car';
                if (selectedTab === 'suvs') return vehicle.type === 'SUV';
                if (selectedTab === 'trucks') return vehicle.type === 'Truck';
                return true;
              })
              .map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.price}</td>
                  <td>
                    <span className={`status-badge ${vehicle.status}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td>{vehicle.lastUpdated}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button view">
                        <Eye size={16} />
                      </button>
                      <button className="action-button edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-button delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="action-button more">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehiclesList;
