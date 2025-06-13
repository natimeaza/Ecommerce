// src/pages/ManageUsers.jsx
import React, { useState, useEffect, useCallback } from 'react';
import UserListHeader from '../componets/users/UserListHeader';
import UserFilters from '../componets/users/UserFilters';
import UserTable from '../componets/users/UserTable';
import NoUsersFound from '../componets/users/NoUsersFound';
import PaginationControls from '../componets/products/PaginationControls'; // Adjust path if in common/
import AddUserModal from '../componets/users/AddUserModal';
import userService from '../service/userService';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';

const USERS_PER_PAGE = 6;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [userRoles, setUserRoles] = useState([]);
  const [userStatuses, setUserStatuses] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: USERS_PER_PAGE,
        searchTerm: searchTerm || undefined,
        role: filterRole === 'All' ? undefined : filterRole,
        status: filterStatus === 'All' ? undefined : filterStatus,
      };
      const response = await userService.getUsers(params);
      setUsers(response.data.users);
      setTotalUsers(response.data.totalUsers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users. Please try again.');
      setUsers([]);
      setTotalUsers(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterRole, filterStatus]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [roleRes, statusRes] = await Promise.all([
          userService.getUniqueUserRoles(),
          userService.getUniqueUserStatuses(),
        ]);
        setUserRoles(['All', ...roleRes.data]);
        setUserStatuses(['All', ...statusRes.data]);
      } catch (err) {
        console.error('Failed to fetch user filter options:', err);
        setUserRoles(['All', ...[...new Set(userService.initialMockUsers.map((u) => u.role))].sort()]);
        setUserStatuses(['All', ...[...new Set(userService.initialMockUsers.map((u) => u.status))].sort()]);
      }
    };
    fetchFilterOptions();
  }, []);

  // Filter change handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleRoleChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  // User Actions
  const handleAddUser = async (userData) => {
  console.log('handleAddUser called with:', userData);
  try {
    setLoading(true);
    const response = await userService.addUser(userData);
    console.log('User added to service:', response.data);
    setIsModalOpen(false);
    setCurrentPage(1);
    setSearchTerm('');
    setFilterRole('All');
    setFilterStatus('All');
    fetchUsers();
  } catch (error) {
    console.error('Failed to add user:', error);
    alert(`Failed to add user: ${error.message || 'Server error'}`);
  } finally {
    setLoading(false);
  }
};

  const handleViewUserDetails = async (userId) => {
    try {
      setLoading(true);
      const response = await userService.getUserById(userId);
      const userDetails = response.data;
      alert(`User Details:\nID: ${userDetails.id}\nName: ${userDetails.name}\nEmail: ${userDetails.email}\nRole: ${userDetails.role}\nStatus: ${userDetails.status}\nJoined: ${userDetails.dateJoined}\nLast Login: ${userDetails.lastLogin || 'N/A'}`);
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      alert(`Could not fetch details for user ${userId}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId) => {
    alert(`Implement Edit User ID: ${userId}. Open form/modal, call userService.updateUser() and refresh.`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}? This action might be irreversible.`)) {
      try {
        setLoading(true);
        await userService.deleteUser(userId);
        setSelectedUsers((prev) => prev.filter((id) => id !== userId));
        if (users.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchUsers();
        }
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert(`Failed to delete user ${userId}: ${err.message || 'Server error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedUsers = async () => {
    if (selectedUsers.length === 0) {
      alert('No users selected.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} selected user(s)?`)) {
      try {
        setLoading(true);
        await userService.deleteMultipleUsers(selectedUsers);
        setSelectedUsers([]);
        if (users.length === selectedUsers.length && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchUsers();
        }
      } catch (err) {
        console.error('Failed to delete selected users:', err);
        alert(`Failed to delete selected users: ${err.message || 'Server error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    if (window.confirm(`Change status of user ${userId} to "${newStatus}"?`)) {
      try {
        setLoading(true);
        await userService.updateUserStatus(userId, newStatus);
        fetchUsers();
      } catch (err) {
        console.error('Failed to update user status:', err);
        alert(`Failed to update status for user ${userId}: ${err.message || 'Server error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Selection Logic
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const isAllCurrentPageSelected = users.length > 0 && selectedUsers.length === users.length;

  // Render logic
  const renderContent = () => {
    if (loading && users.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <FiLoader size={48} className="mx-auto mb-3 text-habesha_blue animate-spin" />
          <p className="text-lg font-medium">Loading users...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-12 text-red-600 bg-red-50 p-6 rounded-lg">
          <FiAlertTriangle size={48} className="mx-auto mb-3" />
          <p className="text-lg font-medium">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-habesha_blue text-white rounded hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      );
    }
    if (users.length === 0 && !loading) {
      const isFiltered = searchTerm || filterRole !== 'All' || filterStatus !== 'All';
      return (
        <NoUsersFound
          message={isFiltered ? 'No users match your criteria' : 'No users found'}
          subMessage={isFiltered ? 'Try adjusting your search or filters.' : 'Add a new user to get started!'}
        />
      );
    }
    return (
      <UserTable
        users={users}
        selectedUsers={selectedUsers}
        onSelectAll={handleSelectAll}
        onSelectUser={handleSelectUser}
        onViewUserDetails={handleViewUserDetails}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onUpdateUserStatus={handleUpdateUserStatus}
        isAllCurrentPageSelected={isAllCurrentPageSelected}
      />
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
      <UserListHeader onAddUser={() => setIsModalOpen(true)} />
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterRole={filterRole}
        onRoleChange={handleRoleChange}
        roles={userRoles}
        filterStatus={filterStatus}
        onStatusChange={handleStatusChange}
        statuses={userStatuses}
        selectedUsersCount={selectedUsers.length}
        onDeleteSelected={handleDeleteSelectedUsers}
      />
      {loading && users.length > 0 && (
        <div className="flex justify-center items-center py-4">
          <FiLoader className="animate-spin text-habesha_blue h-6 w-6" />
          <span className="ml-2 text-sm text-gray-600">Refreshing data...</span>
        </div>
      )}
      {renderContent()}
      {!error && users.length > 0 && totalPages > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalUsers}
        />
      )}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={handleAddUser} />
    </div>
  );
};

export default ManageUsers;