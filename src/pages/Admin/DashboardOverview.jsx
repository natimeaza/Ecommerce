// src/pages/admin/DashboardOverview.jsx
import React from 'react';
// import { useLoaderData } from 'react-router-dom';
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  // FiActivity, // Was unused
  FiTrendingUp,
  FiAlertOctagon,
  FiArchive,
  FiMessageSquare,
  FiExternalLink
} from 'react-icons/fi';
// DO NOT import AdminSidebar here

// Reusable Stat Card Component (remains the same)
const StatCard = ({ title, value, icon, trend, trendColor, bgColor = 'bg-white', textColor = 'text-habesha_blue' }) => (
  <div className={`${bgColor} p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
    <div className="flex items-center justify-between mb-2">
      <div className={`p-3 rounded-full bg-opacity-20 ${bgColor === 'bg-white' ? 'bg-habesha_blue' : 'bg-white'}`}>
        {React.cloneElement(icon, { size: 22, className: bgColor === 'bg-white' ? 'text-habesha_blue' : 'text-white' })}
      </div>
      {trend && (
        <span className={`text-xs font-semibold flex items-center ${trendColor || 'text-gray-500'}`}>
          <FiTrendingUp size={14} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{title}</p>
    <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
  </div>
);

// Placeholder for a simple chart component (remains the same)
const MiniChartPlaceholder = ({ title }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg">
    <h3 className="text-md font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="h-48 bg-gradient-to-b from-blue-50 to-transparent rounded-lg flex items-center justify-center">
      <p className="text-gray-400 text-sm">(Chart Area)</p>
    </div>
  </div>
);

// Mock Data (remains the same)
const mockDashboardData = {
  totalRevenue: { value: '$45,231.89', trend: '+2.5%' },
  totalOrders: { value: '1,280', trend: '-1.2%' },
  newCustomers: { value: '85', trend: '+15' },
  pendingOrders: { value: '12', trendColor: 'text-yellow-500' },
  recentOrders: [
    { id: 'ORD-001', customer: 'Nati D.', total: '$120.50', status: 'Processing', date: '2023-10-27' },
    { id: 'ORD-002', customer: 'Abebe B.', total: '$75.00', status: 'Shipped', date: '2023-10-26' },
    { id: 'ORD-003', customer: 'Sara T.', total: '$210.00', status: 'Delivered', date: '2023-10-25' },
    { id: 'ORD-004', customer: 'John Doe', total: '$45.99', status: 'Pending', date: '2023-10-27' },
  ],
  topProducts: [
    { name: 'Habesha Kemis - Elegant', sales: 150, image: 'https://via.placeholder.com/40?text=HK' },
    { name: 'Gabi - Warm Weave', sales: 120, image: 'https://via.placeholder.com/40?text=GB' },
    { name: 'Coffee Beans - Yirgacheffe', sales: 95, image: 'https://via.placeholder.com/40?text=CB' },
  ]
};

const DashboardOverview = () => { // Renamed component
  const dashboardData = mockDashboardData;

  return (
    <div className="space-y-8"> {/* Removed p-1 as layout will handle padding */}
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-700">Dashboard Overview</h1> {/* Changed title */}
      </div>

      {/* Stats Cards Row (content remains the same) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={dashboardData.totalRevenue.value}
          icon={<FiDollarSign />}
          trend={dashboardData.totalRevenue.trend}
          trendColor="text-green-500"
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders.value}
          icon={<FiShoppingCart />}
          trend={dashboardData.totalOrders.trend}
          trendColor={dashboardData.totalOrders.trend.startsWith('+') ? "text-green-500" : "text-red-500"}
        />
        <StatCard
          title="New Customers"
          value={dashboardData.newCustomers.value}
          icon={<FiUsers />}
          trend={dashboardData.newCustomers.trend}
          trendColor="text-blue-500"
        />
         <StatCard
          title="Pending Orders"
          value={dashboardData.pendingOrders.value}
          icon={<FiAlertOctagon />}
          bgColor="bg-yellow-400"
          textColor="text-white"
          trendColor="text-yellow-100"
        />
      </div>

      {/* Main Content Area (content remains the same) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Trends</h2>
          <div className="h-72 bg-gradient-to-br from-habesha_blue/5 via-sky-50 to-transparent rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-lg">(Main Chart Placeholder)</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Top Selling Products</h3>
            <ul className="space-y-3">
              {dashboardData.topProducts.map(product => (
                <li key={product.name} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded-md">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded-md mr-3 object-cover"/>
                    <span className="text-gray-600">{product.name}</span>
                  </div>
                  <span className="font-semibold text-habesha_blue">{product.sales} sales</span>
                </li>
              ))}
            </ul>
             <button className="mt-4 w-full text-center text-sm text-habesha_blue hover:underline font-medium flex items-center justify-center">
                View All Products <FiExternalLink size={14} className="ml-1"/>
            </button>
          </div>
           <div className="bg-white p-5 rounded-xl shadow-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
                <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                    <FiArchive size={16} className="mr-2"/> Manage Inventory
                </button>
                 <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                    <FiMessageSquare size={16} className="mr-2"/> View Messages
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table (content remains the same) */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
            <button className="text-sm text-habesha_blue hover:underline font-medium flex items-center">
                View All Orders <FiExternalLink size={14} className="ml-1"/>
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-habesha_blue hover:underline cursor-pointer">{order.id}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">{order.total}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; // Renamed export