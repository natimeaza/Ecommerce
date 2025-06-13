// src/components/users/AddUserModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import userService from '../../service/userService';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer',
    status: 'Active',
    avatar: '',
  });
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [roleRes, statusRes] = await Promise.all([
          userService.getUniqueUserRoles(),
          userService.getUniqueUserStatuses(),
        ]);
        setRoles(roleRes.data);
        setStatuses(statusRes.data);
        console.log('Fetched roles:', roleRes.data, 'Statuses:', statusRes.data);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value); // Debug log
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    if (!formData.name || !formData.name.trim()) {
      alert('Name is required.');
      console.warn('Validation failed: Name is empty or undefined');
      return;
    }
    if (!formData.email || !formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Please enter a valid email.');
      console.warn('Validation failed: Invalid email');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      console.warn('Validation failed: Password too short');
      return;
    }
    try {
      console.log('Calling onAddUser with:', formData);
      await onAddUser(formData);
      console.log('User added successfully');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Customer',
        status: 'Active',
        avatar: '',
      });
      onClose();
    } catch (error) {
      console.error('Failed to add user:', error);
      alert(`Failed to add user: ${error.message || 'Server error'}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name || ''} // Ensure value is never undefined
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role || 'Customer'}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status || 'Active'}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-600">Avatar URL (Optional)</label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              value={formData.avatar || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-habesha_blue text-white rounded-lg hover:bg-opacity-90"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;