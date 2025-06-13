import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiUsers, FiSettings, FiClipboard, FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const language = useSelector((state) => state.habesha.language);

  const text = {
    EN: {
      adminPanel: 'Admin Panel',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      settings: 'Settings',
    },
    AMH: {
      adminPanel: 'የአስተዳደር ፓነል',
      dashboard: 'ዳሽቦርድ',
      products: 'ምርቶች',
      orders: 'ትዕዛዦች',
      users: 'ተጠቃሚዎች',
      settings: 'ቅንብሮች',
    },
  };

  const currentText = text[language];

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-2 text-xs xs:text-sm font-medium rounded-lg group transition-colors duration-150 ${
      isActive
        ? 'bg-habesha_blue text-habesha_white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-habesha_blue'
    }`;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 start-4 z-50 p-2 rounded-full bg-habesha_white text-habesha_blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-habesha_blue"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? currentText.closeSidebar : currentText.openSidebar}
      >
        {isSidebarOpen ? (
          <FiX className="h-5 w-5 xs:h-6 xs:w-6" />
        ) : (
          <FiMenu className="h-5 w-5 xs:h-6 xs:w-6" />
        )}
      </button>

      <aside
        className={`fixed md:static top-0 start-0 h-full w-48 xs:w-56 sm:w-64 bg-habesha_white border-e border-gray-200 flex flex-col shrink-0 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-40`}
      >
        <div className="h-14 xs:h-16 flex items-center justify-center px-4 xs:px-6 border-b border-gray-200">
          <span
            className="text-base xs:text-lg sm:text-xl font-bold font-titleFont text-habesha_blue"
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            {currentText.adminPanel}
          </span>
        </div>
        <nav className="flex-grow p-3 xs:p-4 space-y-1 xs:space-y-1.5 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            className={getNavLinkClass}
            onClick={() => setIsSidebarOpen(false)}
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            <FiGrid className="me-2 xs:me-3 h-4 w-4 xs:h-5 xs:w-5" /> {currentText.dashboard}
          </NavLink>
          <NavLink
            to="/admin/products"
            className={getNavLinkClass}
            onClick={() => setIsSidebarOpen(false)}
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            <FiBox className="me-2 xs:me-3 h-4 w-4 xs:h-5 xs:w-5" /> {currentText.products}
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={getNavLinkClass}
            onClick={() => setIsSidebarOpen(false)}
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            <FiClipboard className="me-2 xs:me-3 h-4 w-4 xs:h-5 xs:w-5" /> {currentText.orders}
          </NavLink>
          <NavLink
            to="/admin/users"
            className={getNavLinkClass}
            onClick={() => setIsSidebarOpen(false)}
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            <FiUsers className="me-2 xs:me-3 h-4 w-4 xs:h-5 xs:w-5" /> {currentText.users}
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={getNavLinkClass}
            onClick={() => setIsSidebarOpen(false)}
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            <FiSettings className="me-2 xs:me-3 h-4 w-4 xs:h-5 xs:w-5" /> {currentText.settings}
          </NavLink>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;