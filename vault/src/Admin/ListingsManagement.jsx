import React, { useState } from 'react';
import {
  Search, Filter, CheckCircle, XCircle, Eye,
  Trash2, MoreVertical, ArrowUp, ArrowDown
} from 'lucide-react';

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

  const filteredListings = listingsData.filter(listing => {
    if (filterStatus === 'all') return true;
    return listing.status === filterStatus;
  });

  const statusColor = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Listings Management</h1>
        <div className="text-sm text-gray-500">
          <a href="#" className="text-blue-600 hover:underline">Home</a> / Listings
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-xl font-bold">42</p>
          <p className="text-sm text-gray-500">Total Listings</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-xl font-bold">8</p>
          <p className="text-sm text-gray-500">Pending Review</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-xl font-bold">28</p>
          <p className="text-sm text-gray-500">Approved</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-xl font-bold">6</p>
          <p className="text-sm text-gray-500">Rejected</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search listings..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md text-sm capitalize ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white shadow rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              {['ID', 'Vehicle', 'Seller', 'Date', 'Price', 'Status', 'Featured', 'Actions'].map(header => (
                <th key={header} className="px-4 py-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredListings.map(listing => (
              <tr key={listing.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{listing.id}</td>
                <td className="px-4 py-2">{listing.vehicle}</td>
                <td className="px-4 py-2">{listing.seller}</td>
                <td className="px-4 py-2">{listing.date}</td>
                <td className="px-4 py-2">{listing.price}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColor[listing.status]}`}>
                    {listing.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {listing.featured
                    ? <span className="text-green-600 text-xs font-semibold">Featured</span>
                    : <span className="text-gray-400 text-xs">-</span>}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center">
                    {listing.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-800" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button className="text-blue-600 hover:text-blue-800" title="View">
                      <Eye size={16} />
                    </button>
                    {!listing.featured && listing.status === 'approved' && (
                      <button className="text-yellow-500 hover:text-yellow-700" title="Feature">
                        <ArrowUp size={16} />
                      </button>
                    )}
                    {listing.featured && (
                      <button className="text-gray-500 hover:text-gray-700" title="Unfeature">
                        <ArrowDown size={16} />
                      </button>
                    )}
                    <button className="text-red-500 hover:text-red-700" title="Delete">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
        <span className="text-sm text-gray-600">Showing 1–6 of 42 listings</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm border rounded-md text-gray-500" disabled>Previous</button>
          <button className="px-3 py-1 text-sm border rounded-md bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 text-sm border rounded-md">2</button>
          <button className="px-3 py-1 text-sm border rounded-md">3</button>
          <span className="px-2 py-1 text-gray-400">...</span>
          <button className="px-3 py-1 text-sm border rounded-md">7</button>
          <button className="px-3 py-1 text-sm border rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
}

export default ListingsManagement;
