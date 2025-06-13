import React, { useState } from 'react';
import { FiArchive, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuickLinks = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state.habesha.language); // Access language state
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Bilingual text
  const text = {
    EN: {
      quickLinks: 'Quick Links',
      manageInventory: 'Manage Inventory',
      viewMessages: 'View Messages',
      loading: 'Loading...',
      error: 'Failed to navigate. Please try again.',
    },
    AMH: {
      quickLinks: 'ፈጣን አገናኞች',
      manageInventory: 'እቃዎችን ያቀናብሩ',
      viewMessages: 'መልዕክቶችን ይመልከቱ',
      loading: 'በመጫን ላይ...',
      error: 'መሄድ አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
    },
  };

  const currentText = text[language];

  const handleNavigation = async (route, setLoading) => {
    setLoading(true);
    try {
      // Simulate async operation (e.g., checking route availability)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
      navigate(route);
    } catch (error) {
      console.error('Navigation error:', error);
      alert(currentText.error); // Replace with toast notification in production
    } finally {
      setLoading(false);
    }
  };

  const goToInventory = () => handleNavigation('/admin/inventory', setIsLoadingInventory);
  const goToMessages = () => handleNavigation('/admin/messages', setIsLoadingMessages);

  return (
    <div
      className="bg-habesha_white p-3 xs:p-4 sm:p-5 rounded-xl shadow-habeshaInput max-w-md mx-auto"
      dir={language === 'AMH' ? 'rtl' : 'ltr'}
    >
      <h3 className="font-titleFont text-base xs:text-lg font-semibold text-habesha_blue mb-2 xs:mb-3">
        {currentText.quickLinks}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
        <button
          onClick={goToInventory}
          disabled={isLoadingInventory}
          className={`text-sm xs:text-base bg-quantity_box hover:bg-gray-200 text-habesha_blue p-2 xs:p-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 ${
            isLoadingInventory ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={currentText.manageInventory}
        >
          <FiArchive size={14} className="mr-1 xs:mr-2" />
          {isLoadingInventory ? currentText.loading : currentText.manageInventory}
        </button>
        <button
          onClick={goToMessages}
          disabled={isLoadingMessages}
          className={`text-sm xs:text-base bg-quantity_box hover:bg-gray-200 text-habesha_blue p-2 xs:p-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 ${
            isLoadingMessages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={currentText.viewMessages}
        >
          <FiMessageSquare size={14} className="mr-1 xs:mr-2" />
          {isLoadingMessages ? currentText.loading : currentText.viewMessages}
        </button>
      </div>
    </div>
  );
};

export default QuickLinks;