import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  UserCheck,
  Car,
} from 'lucide-react';

function DashboardHome() {
  const recentVehicles = [
    { id: 'VH-2345', model: 'BMW X5', price: '$78,900', status: 'approved', date: 'May 15, 2025' },
    { id: 'VH-2344', model: 'Tesla Model 3', price: '$42,500', status: 'pending', date: 'May 14, 2025' },
    { id: 'VH-2343', model: 'Mercedes GLC', price: '$52,300', status: 'approved', date: 'May 13, 2025' },
    { id: 'VH-2342', model: 'Audi Q7', price: '$65,700', status: 'approved', date: 'May 12, 2025' },
    { id: 'VH-2341', model: 'Toyota Camry', price: '$28,500', status: 'rejected', date: 'May 11, 2025' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          <a href="#" className="hover:underline text-blue-500">Home</a> / Dashboard
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card */}
        {[
          {
            icon: <Car size={20} />,
            value: '2,568',
            label: 'Total Vehicles',
            trend: '12.5%',
            trendIcon: <TrendingUp size={16} />,
            trendColor: 'text-green-500',
          },
          {
            icon: <UserCheck size={20} />,
            value: '15,230',
            label: 'Active Users',
            trend: '8.2%',
            trendIcon: <TrendingUp size={16} />,
            trendColor: 'text-green-500',
          },
          {
            icon: <DollarSign size={20} />,
            value: '$854,200',
            label: 'Total Revenue',
            trend: '5.7%',
            trendIcon: <TrendingUp size={16} />,
            trendColor: 'text-green-500',
          },
          {
            icon: <Activity size={20} />,
            value: '168',
            label: 'Pending Approvals',
            trend: '3.2%',
            trendIcon: <TrendingDown size={16} />,
            trendColor: 'text-red-500',
          },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-md flex items-start gap-4">
            <div className="p-2 rounded-full bg-gray-100 text-gray-700">{stat.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
              <div className={`flex items-center gap-1 mt-1 text-sm ${stat.trendColor}`}>
                {stat.trendIcon}
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Listings Chart Placeholder */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Listings</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          {/* Chart Placeholder */}
          <div className="flex items-end justify-between h-40 w-full">
            {[
              { label: 'Jan', height: '40%' },
              { label: 'Feb', height: '65%' },
              { label: 'Mar', height: '50%' },
              { label: 'Apr', height: '75%' },
              { label: 'May', height: '85%' },
              { label: 'Jun', height: '60%' },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center w-full">
                <div className="w-6 bg-blue-500 rounded-t-md" style={{ height: bar.height }}></div>
                <span className="mt-1 text-sm text-gray-500">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Vehicles Table */}
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Vehicles</h3>
            <button className="text-blue-500 text-sm hover:underline">View All</button>
          </div>
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Model</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{vehicle.id}</td>
                  <td className="py-2 px-4">{vehicle.model}</td>
                  <td className="py-2 px-4">{vehicle.price}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        vehicle.status === 'approved'
                          ? 'bg-green-100 text-green-600'
                          : vehicle.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{vehicle.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
