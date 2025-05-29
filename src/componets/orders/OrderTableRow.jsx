// src/components/orders/OrderTableRow.jsx
import React from 'react';
import { FiEye, FiRefreshCw, FiEdit3, FiTruck, FiCheckCircle, FiXCircle, FiDollarSign } from 'react-icons/fi';
import { getOrderStatusClass } from '../../utils/helpers';

// Helper to get icon component directly in this file for clarity
const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiRefreshCw className="mr-1.5 h-3 w-3" />;
      case 'Processing': return <FiEdit3 className="mr-1.5 h-3 w-3" />;
      case 'Shipped': return <FiTruck className="mr-1.5 h-3 w-3" />;
      case 'Delivered': return <FiCheckCircle className="mr-1.5 h-3 w-3" />;
      case 'Cancelled': return <FiXCircle className="mr-1.5 h-3 w-3" />;
      case 'Refunded': return <FiDollarSign className="mr-1.5 h-3 w-3" />;
      default: return null;
    }
};

const OrderTableRow = ({ order, isSelected, onSelectOrder, onViewOrderDetails, onUpdateStatus }) => {
  const availableStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']; // Define available statuses for dropdown

  return (
    <tr className={`hover:bg-gray-50/50 transition-colors ${isSelected ? 'bg-habesha_blue/10' : ''}`}>
      <td className="p-4">
        <input
          type="checkbox"
          className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
          checked={isSelected}
          onChange={(e) => onSelectOrder(e, order.id)}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button onClick={() => onViewOrderDetails(order.id)} className="text-sm font-medium text-habesha_blue hover:underline">
          {order.id}
        </button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-800">{order.customerName}</div>
        <div className="text-xs text-gray-500">{order.customerEmail}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {new Date(order.date).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-semibold">
        ${order.total.toFixed(2)}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
        {order.items}
      </td>
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
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-1 flex items-center">
        <button
          onClick={() => onViewOrderDetails(order.id)}
          className="text-gray-500 hover:text-habesha_blue p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="View Details"
        >
          <FiEye size={18} />
        </button>
        <select
          value={order.status}
          onChange={(e) => onUpdateStatus(order.id, e.target.value)}
          className="text-xs p-1.5 border border-gray-300 rounded-md focus:ring-habesha_blue focus:border-habesha_blue shadow-sm"
          title="Update Status"
          onClick={(e) => e.stopPropagation()} // Prevents row click if dropdown is part of clickable row area
        >
          {availableStatuses.map(statusOption => (
            <option key={statusOption} value={statusOption}>{statusOption}</option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default OrderTableRow;