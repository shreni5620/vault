import React, { useState } from 'react';
import { BarChart2, LineChart, Calendar, Download } from 'lucide-react';

function Analytics() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics & Reporting</h1>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <a href="#" className="hover:underline text-blue-600">Home</a>
          <span>/</span>
          <span>Analytics</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map(range => (
            <button
              key={range}
              className={`px-4 py-2 rounded-md text-sm border ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md px-2 py-1 gap-2">
            <Calendar size={16} />
            <input
              type="text"
              placeholder="May 1, 2025"
              className="outline-none text-sm w-28"
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="flex items-center border rounded-md px-2 py-1 gap-2">
            <Calendar size={16} />
            <input
              type="text"
              placeholder="May 31, 2025"
              className="outline-none text-sm w-28"
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Traffic Overview</h3>
              <p className="text-sm text-gray-500">Total vehicle views and leads</p>
            </div>
            <div className="flex gap-2">
              {['Views', 'Leads', 'Conversions'].map((label, i) => (
                <button
                  key={i}
                  className={`text-sm px-3 py-1 rounded ${
                    i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 h-60 rounded-md flex items-end justify-between px-4 py-2 text-sm text-gray-500">
            {/* Y-axis Labels */}
            <div className="flex flex-col justify-between h-full pr-2 text-right">
              {['100k', '80k', '60k', '40k', '20k', '0'].map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>
            {/* Line chart content placeholder */}
            <div className="w-full flex flex-col justify-end">
              <div className="h-4/6 bg-blue-200 rounded-md w-full mb-4"></div>
              <div className="flex justify-between text-xs">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Vehicle Types */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Top Vehicle Types</h3>
              <p className="text-sm text-gray-500">Most viewed categories</p>
            </div>
            <div className="flex gap-2 text-gray-500">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'SUVs', value: '42.5%', height: '85%' },
              { label: 'Sedans', value: '32.5%', height: '65%' },
              { label: 'Trucks', value: '20%', height: '40%' },
              { label: 'Electric', value: '10%', height: '20%' },
              { label: 'Luxury', value: '5%', height: '10%' },
            ].map(({ label, value, height }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="bg-blue-500 w-2 rounded"
                  style={{ height }}
                ></div>
                <span className="flex-1 text-sm">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Acquisition */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">User Acquisition</h3>
              <p className="text-sm text-gray-500">How users find us</p>
            </div>
            <div className="flex gap-2 text-gray-500">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              {/* Donut chart placeholder */}
              <span className="text-xs text-gray-500">Donut Chart</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm w-full">
              {[
                { label: 'Search', value: '45%', color: 'bg-blue-500' },
                { label: 'Direct', value: '25%', color: 'bg-green-500' },
                { label: 'Social', value: '20%', color: 'bg-pink-500' },
                { label: 'Referral', value: '10%', color: 'bg-yellow-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${color} rounded-full`}></div>
                    <span>{label}</span>
                  </div>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Regional Performance</h3>
              <p className="text-sm text-gray-500">Listings by region</p>
            </div>
            <div className="flex gap-2 text-gray-500">
              <LineChart size={18} />
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="divide-y text-sm text-gray-700">
            <div className="flex justify-between font-semibold pb-2">
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
                className="flex justify-between py-1"
              >
                <span>{region}</span>
                <span>{listings}</span>
                <span className={`${growth.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
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
