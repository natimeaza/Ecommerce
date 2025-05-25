// src/pages/admin/SettingsPage.jsx
import React, { useState } from 'react';
import {
 FiHome, FiCreditCard, FiTruck, /*FiPercent, FiMail, FiKey, FiEye,*/ FiSave, FiSliders, FiBell
} from 'react-icons/fi';

// Mock initial settings data - In a real app, this would be fetched from an API
const initialSettings = {
  storeInfo: {
    name: 'Habesha Store',
    tagline: 'Authentic Ethiopian Crafts & Goods',
    email: 'contact@habeshastore.com',
    phone: '+251 911 123456',
    address: '123 Bole Road, Addis Ababa, Ethiopia',
    logoUrl: 'https://via.placeholder.com/150/A9CCE3/2C3E50?text=LOGO',
    currency: 'ETB',
  },
  payment: {
    stripeApiKey: 'sk_test_xxxxxxxxxxxx',
    paypalClientId: 'AZxxxxxxxxxxxxxxx',
    enableStripe: true,
    enablePaypal: false,
  },
  shipping: {
    defaultMethod: 'Standard Shipping',
    freeShippingThreshold: 100, // Amount in store's primary currency
    handlingFee: 2.50,
  },
  notifications: {
    adminOrderEmail: 'admin@habeshastore.com',
    sendOrderConfirmation: true,
    sendShippingUpdate: true,
  }
};

// Generic Input Field Component (can be expanded)
const InputField = ({ label, id, type = 'text', value, onChange, placeholder, icon, helpText }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {icon && React.cloneElement(icon, { className: 'inline mr-2 h-4 w-4 text-gray-500' })}
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-habesha_blue focus:border-habesha_blue sm:text-sm"
    />
    {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
  </div>
);

const ToggleSwitch = ({ label, id, checked, onChange, helpText }) => (
    <div className="flex items-center justify-between mb-4 py-2">
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
        </div>
        <button
            type="button"
            onClick={() => onChange({ target: { name: id, checked: !checked }})} // Simulate event object
            className={`${
            checked ? 'bg-habesha_blue' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-habesha_blue`}
            role="switch"
            aria-checked={checked}
        >
            <span className="sr-only">Enable</span>
            <span
            className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
        </button>
    </div>
);


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('storeInfo');
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false); // For save operation

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleToggleChange = (section, field, checked) => {
    setSettings(prev => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: checked,
        },
    }));
  };


  const handleSaveChanges = (section) => {
    setIsLoading(true);
    console.log(`Saving ${section} settings:`, settings[section]);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`${section.replace(/([A-Z])/g, ' $1').trim()} settings saved successfully! (Mock)`);
      // In a real app, you'd probably refetch settings or rely on optimistic update
    }, 1500);
  };

  const tabs = [
    { id: 'storeInfo', label: 'Store Information', icon: <FiHome /> },,
    { id: 'payment', label: 'Payment Gateways', icon: <FiCreditCard /> },
    { id: 'shipping', label: 'Shipping', icon: <FiTruck /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    // Add more tabs like: { id: 'taxes', label: 'Taxes', icon: <FiPercent /> },
    // { id: 'integrations', label: 'Integrations', icon: <FiKey /> },
    // { id: 'appearance', label: 'Appearance', icon: <FiEye /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'storeInfo':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges('storeInfo'); }}>
            <InputField label="Store Name" id="name" value={settings.storeInfo.name} onChange={(e) => handleInputChange('storeInfo', 'name', e.target.value)} placeholder="Your Store Name" />
            <InputField label="Tagline" id="tagline" value={settings.storeInfo.tagline} onChange={(e) => handleInputChange('storeInfo', 'tagline', e.target.value)} placeholder="Your store's catchy phrase" />
            <InputField label="Contact Email" id="email" type="email" value={settings.storeInfo.email} onChange={(e) => handleInputChange('storeInfo', 'email', e.target.value)} placeholder="support@example.com" />
            <InputField label="Phone Number" id="phone" value={settings.storeInfo.phone} onChange={(e) => handleInputChange('storeInfo', 'phone', e.target.value)} placeholder="+251..." />
            <InputField label="Store Address" id="address" type="textarea" value={settings.storeInfo.address} onChange={(e) => handleInputChange('storeInfo', 'address', e.target.value)} placeholder="Full store address" />
            <InputField label="Logo URL" id="logoUrl" value={settings.storeInfo.logoUrl} onChange={(e) => handleInputChange('storeInfo', 'logoUrl', e.target.value)} placeholder="https://example.com/logo.png" />
            {/* Currency might be a select dropdown */}
            <InputField label="Store Currency" id="currency" value={settings.storeInfo.currency} onChange={(e) => handleInputChange('storeInfo', 'currency', e.target.value)} placeholder="e.g., USD, ETB" />
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto mt-4 bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center transition-colors disabled:opacity-50">
              <FiSave className="mr-2 h-5 w-5" /> {isLoading ? 'Saving...' : 'Save Store Info'}
            </button>
          </form>
        );
      case 'payment':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges('payment'); }}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Stripe</h3>
            <ToggleSwitch label="Enable Stripe" id="enableStripe" checked={settings.payment.enableStripe} onChange={(e) => handleToggleChange('payment', 'enableStripe', e.target.checked)} />
            {settings.payment.enableStripe && (
                <InputField label="Stripe API Secret Key" id="stripeApiKey" type="password" value={settings.payment.stripeApiKey} onChange={(e) => handleInputChange('payment', 'stripeApiKey', e.target.value)} placeholder="sk_test_xxxxxxxxxxxx" />
            )}
            <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6 border-b pb-2">PayPal</h3>
            <ToggleSwitch label="Enable PayPal" id="enablePaypal" checked={settings.payment.enablePaypal} onChange={(e) => handleToggleChange('payment', 'enablePaypal', e.target.checked)} />
            {settings.payment.enablePaypal && (
                <InputField label="PayPal Client ID" id="paypalClientId" value={settings.payment.paypalClientId} onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)} placeholder="AZxxxxxxxxxxxxxxx" />
            )}
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto mt-6 bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center transition-colors disabled:opacity-50">
                <FiSave className="mr-2 h-5 w-5" /> {isLoading ? 'Saving...' : 'Save Payment Settings'}
            </button>
          </form>
        );
      case 'shipping':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges('shipping'); }}>
            <InputField label="Default Shipping Method Name" id="defaultMethod" value={settings.shipping.defaultMethod} onChange={(e) => handleInputChange('shipping', 'defaultMethod', e.target.value)} placeholder="e.g., Standard Ground" />
            <InputField label="Free Shipping Threshold ($)" id="freeShippingThreshold" type="number" value={settings.shipping.freeShippingThreshold} onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value) || 0)} placeholder="100" />
            <InputField label="Handling Fee ($)" id="handlingFee" type="number" value={settings.shipping.handlingFee} onChange={(e) => handleInputChange('shipping', 'handlingFee', parseFloat(e.target.value) || 0)} placeholder="2.50" />
             {/* Add more shipping settings like zones, rates per zone etc. */}
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto mt-4 bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center transition-colors disabled:opacity-50">
                <FiSave className="mr-2 h-5 w-5" /> {isLoading ? 'Saving...' : 'Save Shipping Settings'}
            </button>
          </form>
        );
      case 'notifications':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges('notifications'); }}>
            <InputField label="Admin Email for New Orders" id="adminOrderEmail" type="email" value={settings.notifications.adminOrderEmail} onChange={(e) => handleInputChange('notifications', 'adminOrderEmail', e.target.value)} placeholder="admin@example.com" />
            <ToggleSwitch label="Send Order Confirmation to Customer" id="sendOrderConfirmation" checked={settings.notifications.sendOrderConfirmation} onChange={(e) => handleToggleChange('notifications', 'sendOrderConfirmation', e.target.checked)} />
            <ToggleSwitch label="Send Shipping Update to Customer" id="sendShippingUpdate" checked={settings.notifications.sendShippingUpdate} onChange={(e) => handleToggleChange('notifications', 'sendShippingUpdate', e.target.checked)} />
            {/* Add options to customize email templates here */}
             <button type="submit" disabled={isLoading} className="w-full sm:w-auto mt-4 bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center transition-colors disabled:opacity-50">
                <FiSave className="mr-2 h-5 w-5" /> {isLoading ? 'Saving...' : 'Save Notification Settings'}
            </button>
          </form>
        );
      default:
        return <p>Select a settings category.</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FiSliders className="mr-3 text-gray-600"/> Settings
        </h1>
      </div>

      <div className="lg:flex lg:gap-x-6">
        {/* Tab Navigation (Sidebar for settings) */}
        <nav className="lg:w-1/4 xl:w-1/5 space-y-1 mb-6 lg:mb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                ${activeTab === tab.id
                  ? 'bg-habesha_blue text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
            >
              {React.cloneElement(tab.icon, { className: `mr-3 h-5 w-5 flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'}` })}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content Area */}
        <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;