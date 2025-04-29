import React, { useState } from 'react';
import { Search, Filter, Plus, Download, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vehicle Inventory</h1>
        <div className="text-sm text-gray-500">
          <a href="#">Home</a>
          <span className="mx-2">/</span>
          <span>Vehicles</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <Search size={18} />
            <input type="text" placeholder="Search vehicles..." className="bg-transparent border-none ml-2 focus:outline-none" />
          </div>
          <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 p-2 bg-green-500 text-white rounded-lg">
            <Plus size={18} />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button 
            className={`py-2 px-4 rounded-md ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab('all')}
          >
            All Vehicles
          </button>
          <button 
            className={`py-2 px-4 rounded-md ${selectedTab === 'cars' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab('cars')}
          >
            Cars
          </button>
          <button 
            className={`py-2 px-4 rounded-md ${selectedTab === 'suvs' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab('suvs')}
          >
            SUVs
          </button>
          <button 
            className={`py-2 px-4 rounded-md ${selectedTab === 'trucks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab('trucks')}
          >
            Trucks
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
              <th className="px-4 py-2 text-left">Actions</th>
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
                <tr key={vehicle.id} className="border-b">
                  <td className="px-4 py-2">{vehicle.id}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.year}</td>
                  <td className="px-4 py-2">{vehicle.type}</td>
                  <td className="px-4 py-2">{vehicle.price}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${vehicle.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{vehicle.lastUpdated}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Eye size={16} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">Showing 1-7 of 42 vehicles</span>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md text-sm" disabled>Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">1</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">2</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">3</button>
          <span className="px-2 py-2 text-sm">...</span>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">6</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}

export default VehiclesList;
