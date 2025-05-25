// src/pages/ManageUsers.jsx
import React, { useState } from 'react';
// import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiUserPlus, FiEdit, FiTrash2, FiEye, FiUserCheck, FiUserX,
  FiChevronLeft, FiChevronRight, FiUsers as FiUsersIcon, FiMail, FiShield
} from 'react-icons/fi';

// Mock Data - Replace with actual API data
const initialMockUsers = [
  { id: 'U001', name: 'Nati Demelash', email: 'nati.d@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-01-15', lastLogin: '2023-10-28', avatar: 'https://via.placeholder.com/40/A9CCE3/2C3E50?text=ND' },
  { id: 'U002', name: 'Abebe Bikila', email: 'abebe.b@example.com', role: 'Customer', status: 'Active', dateJoined: '2023-03-22', lastLogin: '2023-10-27', avatar: 'https://via.placeholder.com/40/D5DBDB/2C3E50?text=AB' },
  { id: 'U003', name: 'Sara Tadesse', email: 'sara.t@example.com', role: 'Editor', status: 'Active', dateJoined: '2023-05-10', lastLogin: '2023-10-29', avatar: 'https://via.placeholder.com/40/ABEBC6/2C3E50?text=ST' },
  { id: 'U004', name: 'John Doe', email: 'john.d@example.com', role: 'Customer', status: 'Inactive', dateJoined: '2023-02-01', lastLogin: '2023-08-15', avatar: 'https://via.placeholder.com/40/FAD7A0/2C3E50?text=JD' },
  { id: 'U005', name: 'Lia Kebede', email: 'lia.k@example.com', role: 'Customer', status: 'Active', dateJoined: '2023-07-19', lastLogin: '2023-10-25', avatar: 'https://via.placeholder.com/40/CCD1D1/2C3E50?text=LK' },
  { id: 'U006', name: 'Bruk Mamo', email: 'bruk.m@example.com', role: 'Support', status: 'Suspended', dateJoined: '2023-04-05', lastLogin: '2023-09-30', avatar: 'https://via.placeholder.com/40/F5B7B1/2C3E50?text=BM' },
];

// Helper for status badge styling
const getUserStatusClass = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Inactive': return 'bg-gray-200 text-gray-600';
    case 'Suspended': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-500';
  }
};

const getUserStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <FiUserCheck className="mr-1.5 h-3 w-3" />;
      case 'Inactive': return <FiUserX className="mr-1.5 h-3 w-3 text-gray-400" />;
      case 'Suspended': return <FiUserX className="mr-1.5 h-3 w-3 text-red-500" />;
      default: return null;
    }
  };


const ManageUsers = () => {
  const [users, setUsers] = useState(initialMockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const navigate = useNavigate();

  // Filters state
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Derived states for filtering and pagination
  const filteredAndSearchedUsers = users
    .filter(user =>
      (filterRole === 'All' || user.role === filterRole) &&
      (filterStatus === 'All' || user.status === filterStatus)
    )
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredAndSearchedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredAndSearchedUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- User Actions (Placeholders) ---
  const handleAddUser = () => {
    // navigate('/admin/users/new'); // Or open a modal
    alert('Open Add New User Form/Modal');
  };

  const handleViewUserDetails = (userId) => {
    // navigate(`/admin/users/${userId}`);
    alert(`View details for User ID: ${userId}`);
    const user = users.find(u => u.id === userId);
    console.log("User Details:", user);
  };

  const handleEditUser = (userId) => {
    // navigate(`/admin/users/edit/${userId}`);
    alert(`Open Edit Form for User ID: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}? This action might be irreversible.`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setSelectedUsers(prev => prev.filter(id => id !== userId));
      alert(`User ${userId} deleted (mock).`);
    }
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    if (window.confirm(`Change status of user ${userId} to "${newStatus}"?`)) {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );
        alert(`User ${userId} status updated to ${newStatus} (mock).`);
    }
  };

  // --- Selection Logic ---
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(currentUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };
  const isAllCurrentPageSelected = currentUsers.length > 0 && selectedUsers.length === currentUsers.filter(u => selectedUsers.includes(u.id)).length && currentUsers.every(u => selectedUsers.includes(u.id));


  return (
    <div className="space-y-6">
      {/* Header Section: Title and Add User Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>
        <button
          onClick={handleAddUser}
          className="bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm flex items-center transition-colors text-sm"
        >
          <FiUserPlus className="mr-2 h-5 w-5" /> Add New User
        </button>
      </div>

      {/* Filters and Search Bar Section */}
      <div className="p-4 bg-white rounded-xl shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Search Input */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <label htmlFor="searchUser" className="sr-only">Search Users</label>
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="searchUser"
              type="search"
              placeholder="Search by name, email, ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent shadow-sm"
            />
          </div>
          {/* Role Filter */}
          <div>
            <label htmlFor="roleFilter" className="block text-xs font-medium text-gray-500 mb-1">Role</label>
            <select
              id="roleFilter"
              value={filterRole}
              onChange={e => { setFilterRole(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Roles</option>
              {[...new Set(initialMockUsers.map(u => u.role))].sort().map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilterUser" className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              id="statusFilterUser" // Unique ID for this select
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Statuses</option>
              {[...new Set(initialMockUsers.map(u => u.status))].sort().map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
          </div>
        </div>
        {selectedUsers.length > 0 && (
            <div className="pt-3">
                 <p className="text-sm text-habesha_blue font-medium">{selectedUsers.length} user(s) selected.</p>
                 {/* Add bulk action buttons here e.g. Change role for selected, Suspend selected */}
            </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="p-4 w-12 text-left">
                  <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                    checked={isAllCurrentPageSelected && currentUsers.length > 0}
                    onChange={handleSelectAll}
                    disabled={currentUsers.length === 0}
                  />
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${selectedUsers.includes(user.id) ? 'bg-habesha_blue/10' : ''}`}>
                  <td className="p-4">
                    <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(e, user.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full object-cover mr-3 shadow-sm" src={user.avatar} alt={user.name} />
                      <div>
                        <button onClick={() => handleViewUserDetails(user.id)} className="text-sm font-medium text-gray-800 hover:text-habesha_blue">{user.name}</button>
                        <div className="text-xs text-gray-500 flex items-center"> <FiMail size={12} className="mr-1 text-gray-400"/> {user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <FiShield size={14} className="mr-1.5 text-gray-400"/>{user.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getUserStatusClass(user.status)}`}>
                      {getUserStatusIcon(user.status)}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(user.dateJoined).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(user.lastLogin).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-1">
                    <button onClick={() => handleViewUserDetails(user.id)} className="text-gray-500 hover:text-habesha_blue p-1.5 rounded-full hover:bg-gray-100 transition-colors" title="View Details">
                      <FiEye size={18} />
                    </button>
                    <button onClick={() => handleEditUser(user.id)} className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors" title="Edit User">
                      <FiEdit size={18} />
                    </button>
                    {user.status !== 'Suspended' && (
                        <button onClick={() => handleUpdateUserStatus(user.id, 'Suspended')} className="text-orange-500 hover:text-orange-700 p-1.5 rounded-full hover:bg-orange-100 transition-colors" title="Suspend User">
                            <FiUserX size={18} />
                        </button>
                    )}
                    {user.status === 'Suspended' && (
                        <button onClick={() => handleUpdateUserStatus(user.id, 'Active')} className="text-green-500 hover:text-green-700 p-1.5 rounded-full hover:bg-green-100 transition-colors" title="Activate User">
                            <FiUserCheck size={18} />
                        </button>
                    )}
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-100 transition-colors" title="Delete User">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAndSearchedUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FiUsersIcon size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm">Try adjusting your search or filter criteria, or add a new user.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 pb-2 bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-b-xl shadow-xl mt-[-1px] z-0 relative">
          <div className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            <span className="hidden sm:inline"> (Total: {filteredAndSearchedUsers.length} users)</span>
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            > <FiChevronLeft className="h-5 w-5" />
            </button>
            {/* Page numbers logic */}
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

export default ManageUsers;