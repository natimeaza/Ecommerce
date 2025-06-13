// src/components/users/NoUsersFound.jsx
import React from 'react';
import { FiUsers } from 'react-icons/fi';

const NoUsersFound = ({ message, subMessage }) => {
  return (
    <div className="text-center py-12 text-gray-500">
      <FiUsers size={48} className="mx-auto mb-3 text-gray-400" />
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm">{subMessage}</p>
    </div>
  );
};

export default NoUsersFound;