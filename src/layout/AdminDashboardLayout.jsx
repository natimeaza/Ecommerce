// src/layouts/AdminDashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../componets/Admin/AdminSidebar';
import AdminHeader from '../componets/Admin/AdminHeader';



const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
       <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;