// src/components/users/UserFilters.jsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';

const UserFilters = ({
  searchTerm,
  onSearchChange,
  filterRole,
  onRoleChange,
  roles,
  filterStatus,
  onStatusChange,
  statuses,
  selectedUsersCount,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="relative md:col-span-2 lg:col-span-1">
          <label htmlFor="searchUser" className="sr-only">Search Users</label>
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="searchUser"
            type="search"
            placeholder="Search by name, email, ID..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="roleFilter" className="block text-xs font-medium text-gray-500 mb-1">Role</label>
          <select
            id="roleFilter"
            value={filterRole}
            onChange={onRoleChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
          >
            <option value="All">All Roles</option>
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="statusFilterUser" className="block text-xs font-medium text-gray-500 mb-1">Status</label>
          <select
            id="statusFilterUser"
            value={filterStatus}
            onChange={onStatusChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
          >
            <option value="All">All Statuses</option>
            {statuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
          </select>
        </div>
      </div>
      {selectedUsersCount > 0 && (
        <div className="pt-3">
          <p className="text-sm text-habesha_blue font-medium">{selectedUsersCount} user(s) selected.</p>
          {/* Add bulk action buttons here */}
        </div>
      )}
    </div>
  );
};

export default UserFilters;