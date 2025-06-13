// src/components/users/UserTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getStatusClass } from '../../utils/helpers';

const UserTable = ({
  users,
  selectedUsers,
  onSelectAll,
  onSelectUser,
  onViewUserDetails,
  onEditUser,
  onDeleteUser,
  onUpdateUserStatus,
  isAllCurrentPageSelected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={isAllCurrentPageSelected}
                onChange={onSelectAll}
                className="h-4 w-4 text-habesha_blue focus:ring-habesha_blue border-gray-300 rounded"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => onSelectUser(e, user.id)}
                  className="h-4 w-4 text-habesha_blue focus:ring-habesha_blue border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=NA')}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.status}
                  onChange={(e) => onUpdateUserStatus(user.id, e.target.value)}
                  className={`px-2 py-1 text-sm rounded ${getStatusClass(user.status)} focus:outline-none`}
                >
                  {['Active', 'Inactive', 'Suspended'].map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.dateJoined).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onViewUserDetails(user.id)}
                  className="text-habesha-blue hover:text-opacity-80 mr-4"
                  title="View Details"
                >
                  <FiEye />
                </button>
                <button
                  onClick={() => onEditUser(user.id)}
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;