// src/pages/ManageOrders.jsx
import React, { useState, useEffect } from 'react';
// import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiFilter, FiEye, FiEdit3, FiTruck, FiCheckCircle, FiXCircle, FiRefreshCw,
  FiChevronLeft, FiChevronRight, FiPackage, FiCalendar, FiUser,FiDollarSign
} from 'react-icons/fi';

// Mock Data - Replace with actual API data
const initialMockOrders = [
  { id: 'ORD74621', customerName: 'Nati Demelash', customerEmail: 'nati.d@example.com', date: '2023-10-28', total: 145.50, items: 3, status: 'Pending', paymentStatus: 'Paid', shippingAddress: '123 Bole St, Addis Ababa' },
  { id: 'ORD38290', customerName: 'Abebe Bikila', customerEmail: 'abebe.b@example.com', date: '2023-10-27', total: 75.00, items: 1, status: 'Processing', paymentStatus: 'Paid', shippingAddress: '456 Cazanchis Ave, Addis Ababa' },
  { id: 'ORD91034', customerName: 'Sara Tadesse', customerEmail: 'sara.t@example.com', date: '2023-10-26', total: 210.00, items: 5, status: 'Shipped', paymentStatus: 'Paid', shippingAddress: '789 CMC Rd, Addis Ababa' },
  { id: 'ORD55678', customerName: 'John Doe', customerEmail: 'john.d@example.com', date: '2023-10-25', total: 45.99, items: 2, status: 'Delivered', paymentStatus: 'Paid', shippingAddress: '012 Hayahulet Blvd, Addis Ababa' },
  { id: 'ORD12389', customerName: 'Lia Kebede', customerEmail: 'lia.k@example.com', date: '2023-10-28', total: 199.75, items: 4, status: 'Cancelled', paymentStatus: 'Refunded', shippingAddress: '345 Piassa Ln, Addis Ababa' },
  { id: 'ORD67890', customerName: 'Teddy Afro', customerEmail: 'teddy.a@example.com', date: '2023-10-29', total: 88.00, items: 2, status: 'Pending', paymentStatus: 'Pending', shippingAddress: '678 Gerji Imperial, Addis Ababa' },
];

// Helper for status badge styling
const getOrderStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    case 'Processing': return 'bg-blue-100 text-blue-700';
    case 'Shipped': return 'bg-indigo-100 text-indigo-700';
    case 'Delivered': return 'bg-green-100 text-green-700';
    case 'Cancelled': return 'bg-red-100 text-red-700';
    case 'Refunded': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-500';
  }
};
const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiRefreshCw className="mr-1.5 h-3 w-3" />;
      case 'Processing': return <FiEdit3 className="mr-1.5 h-3 w-3" />;
      case 'Shipped': return <FiTruck className="mr-1.5 h-3 w-3" />;
      case 'Delivered': return <FiCheckCircle className="mr-1.5 h-3 w-3" />;
      case 'Cancelled': return <FiXCircle className="mr-1.5 h-3 w-3" />;
      case 'Refunded': return <FiDollarSign className="mr-1.5 h-3 w-3" />; // Assuming FiDollarSign is imported
      default: return null;
    }
  };


const ManageOrders = () => {
  const [orders, setOrders] = useState(initialMockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  // const navigate = useNavigate();

  // Filters state
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;

  // Derived states for filtering and pagination
  const filteredAndSearchedOrders = orders
    .filter(order =>
      (filterStatus === 'All' || order.status === filterStatus) &&
      (filterDateFrom === '' || new Date(order.date) >= new Date(filterDateFrom)) &&
      (filterDateTo === '' || new Date(order.date) <= new Date(filterDateTo))
    )
    .filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredAndSearchedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredAndSearchedOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- Order Actions (Placeholders) ---
  const handleViewOrderDetails = (orderId) => {
    // navigate(`/admin/orders/${orderId}`); // Or open a modal
    alert(`View details for Order ID: ${orderId}`);
    const order = orders.find(o => o.id === orderId);
    console.log("Order Details:", order);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    if (window.confirm(`Change status of order ${orderId} to "${newStatus}"?`)) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(`Order ${orderId} status updated to ${newStatus} (mock).`);
    }
  };

  // --- Selection Logic ---
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(currentOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (event, orderId) => {
    if (event.target.checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const isAllCurrentPageSelected = currentOrders.length > 0 && selectedOrders.length === currentOrders.filter(o => selectedOrders.includes(o.id)).length && currentOrders.every(o => selectedOrders.includes(o.id));

  return (
    <div className="space-y-6">
      {/* Header Section: Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Orders</h1>
        {/* Add buttons for bulk actions if needed, e.g., "Export Selected" */}
      </div>

      {/* Filters and Search Bar Section */}
      <div className="p-4 bg-white rounded-xl shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <label htmlFor="searchOrder" className="sr-only">Search Orders</label>
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="searchOrder"
              type="search"
              placeholder="Search by ID, customer..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent shadow-sm"
            />
          </div>
          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1);}}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Statuses</option>
              {[...new Set(initialMockOrders.map(o => o.status))].sort().map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
          </div>
          {/* Date From Filter */}
          <div>
            <label htmlFor="dateFromFilter" className="block text-xs font-medium text-gray-500 mb-1">Date From</label>
            <input
              type="date"
              id="dateFromFilter"
              value={filterDateFrom}
              onChange={e => { setFilterDateFrom(e.target.value); setCurrentPage(1);}}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            />
          </div>
          {/* Date To Filter */}
          <div>
            <label htmlFor="dateToFilter" className="block text-xs font-medium text-gray-500 mb-1">Date To</label>
            <input
              type="date"
              id="dateToFilter"
              value={filterDateTo}
              onChange={e => { setFilterDateTo(e.target.value); setCurrentPage(1);}}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            />
          </div>
        </div>
         {selectedOrders.length > 0 && (
            <div className="pt-3">
                 <p className="text-sm text-habesha_blue font-medium">{selectedOrders.length} order(s) selected.</p>
                 {/* Add bulk action buttons here e.g. Update status for selected */}
            </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="p-4 w-12 text-left">
                  <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                    checked={isAllCurrentPageSelected && currentOrders.length > 0}
                    onChange={handleSelectAll}
                    disabled={currentOrders.length === 0}
                  />
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-gray-50/50 transition-colors ${selectedOrders.includes(order.id) ? 'bg-habesha_blue/10' : ''}`}>
                  <td className="p-4">
                    <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => handleSelectOrder(e, order.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => handleViewOrderDetails(order.id)} className="text-sm font-medium text-habesha_blue hover:underline">
                      {order.id}
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{order.items}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderStatusClass(order.status)}`}>
                      {getOrderStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : order.paymentStatus === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-1">
                    <button onClick={() => handleViewOrderDetails(order.id)} className="text-gray-500 hover:text-habesha_blue p-1.5 rounded-full hover:bg-gray-100 transition-colors" title="View Details">
                      <FiEye size={18} />
                    </button>
                    {/* Example: Dropdown to change status */}
                    <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="text-xs p-1 border border-gray-300 rounded-md focus:ring-habesha_blue focus:border-habesha_blue"
                        title="Update Status"
                    >
                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(statusOption => (
                            <option key={statusOption} value={statusOption}>{statusOption}</option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAndSearchedOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FiPackage size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 pb-2 bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-b-xl shadow-xl mt-[-1px] z-0 relative">
          <div className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            <span className="hidden sm:inline"> (Total: {filteredAndSearchedOrders.length} orders)</span>
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            > <FiChevronLeft className="h-5 w-5" />
            </button>
            {/* Page numbers could be generated here for more complex pagination */}
            {[...Array(totalPages).keys()].map(number => (
                 (number < 2 || number > totalPages - 3 || Math.abs(number + 1 - currentPage) < 2) &&
                <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${currentPage === number + 1 ? 'z-10 bg-habesha_blue border-habesha_blue text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                >
                    {number + 1}
                </button>
            ))}
             {totalPages > 5 && currentPage < totalPages - 3 && totalPages > 4 && <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            > <FiChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;