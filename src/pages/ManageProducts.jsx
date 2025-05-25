// src/pages/ManageProducts.jsx
import React, { useState, useEffect } from 'react';
// import { useLoaderData, useNavigate } from 'react-router-dom'; // If using React Router loaders/navigation
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiGrid, FiList,
  FiChevronLeft, FiChevronRight, FiPackage, FiFilter, FiChevronDown
} from 'react-icons/fi';

// Mock data - Replace with data from useLoaderData() or API call in useEffect
const initialMockProducts = [
  { id: 'P001', name: 'Elegant Habesha Dress', image: 'https://via.placeholder.com/80x100/A9CCE3/2C3E50?text=HD1', category: 'Traditional Wear', price: 125.00, stock: 25, status: 'Active', dateAdded: '2023-10-01' },
  { id: 'P002', name: 'Handwoven Gabi Shawl', image: 'https://via.placeholder.com/80x100/D5DBDB/2C3E50?text=GABI', category: 'Textiles', price: 80.00, stock: 10, status: 'Active', dateAdded: '2023-09-15' },
  { id: 'P003', name: 'Yirgacheffe Coffee Beans (1kg)', image: 'https://via.placeholder.com/80x100/ABEBC6/2C3E50?text=COFFEE', category: 'Consumables', price: 22.00, stock: 0, status: 'Out of Stock', dateAdded: '2023-08-20' },
  { id: 'P004', name: 'Axumite Silver Pendant', image: 'https://via.placeholder.com/80x100/FAD7A0/2C3E50?text=NECK', category: 'Jewelry', price: 155.00, stock: 5, status: 'Low Stock', dateAdded: '2023-10-05' },
  { id: 'P005', name: 'Handcrafted Leather Bag', image: 'https://via.placeholder.com/80x100/CCD1D1/2C3E50?text=BAG', category: 'Accessories', price: 90.00, stock: 15, status: 'Draft', dateAdded: '2023-07-10' },
  { id: 'P006', name: 'Spiced Berbere Mix', image: 'https://via.placeholder.com/80x100/F5B7B1/2C3E50?text=SPICE', category: 'Consumables', price: 8.50, stock: 50, status: 'Active', dateAdded: '2023-09-01' },
];

// Helper for status badge styling
const getStatusClass = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Out of Stock': return 'bg-red-100 text-red-700';
    case 'Low Stock': return 'bg-yellow-100 text-yellow-700';
    case 'Draft': return 'bg-gray-200 text-gray-600';
    default: return 'bg-gray-100 text-gray-500';
  }
};
const getStatusDotClass = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-500';
    case 'Out of Stock': return 'bg-red-500';
    case 'Low Stock': return 'bg-yellow-500';
    case 'Draft': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

const ManageProducts = () => {
  const [products, setProducts] = useState(initialMockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'
  // const navigate = useNavigate(); // For navigation, if using React Router

  // Filters state
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStock, setFilterStock] = useState('All'); // Example: All, In Stock, Low, Out of Stock

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products to display per page

  // Derived states for filtering and pagination
  const filteredAndSearchedProducts = products
    .filter(product =>
      (filterCategory === 'All' || product.category === filterCategory) &&
      (filterStatus === 'All' || product.status === filterStatus) &&
      (filterStock === 'All' ||
        (filterStock === 'InStock' && product.stock > 5) ||
        (filterStock === 'LowStock' && product.stock > 0 && product.stock <= 5) ||
        (filterStock === 'OutOfStock' && product.stock === 0))
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSearchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSearchedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- CRUD Operations (Placeholders) ---
  const handleAddProduct = () => {
    // navigate('/admin/products/new'); // Or open a modal
    alert('Open Add New Product Form/Modal');
    // Example: adding a new product (you'd get data from a form)
    // const newProduct = { id: `P${Date.now().toString().slice(-3)}`, name: 'New Sample Product', image: 'https://via.placeholder.com/80x100', category: 'Uncategorized', price: 0.00, stock: 0, status: 'Draft', dateAdded: new Date().toISOString().split('T')[0] };
    // setProducts(prev => [newProduct, ...prev]);
  };

  const handleEditProduct = (productId) => {
    // navigate(`/admin/products/edit/${productId}`); // Or open a modal with product data
    alert(`Open Edit Form for Product ID: ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(`Are you sure you want to delete product ID: ${productId}?`)) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setSelectedProducts(prev => prev.filter(id => id !== productId));
      alert(`Product ${productId} deleted (mock).`);
    }
  };

  const handleDeleteSelectedProducts = () => {
    if (selectedProducts.length === 0) {
      alert('No products selected.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} selected product(s)?`)) {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      alert(`${selectedProducts.length} products deleted (mock).`);
    }
  };


  // --- Selection Logic ---
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(currentProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (event, productId) => {
    if (event.target.checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const isAllCurrentPageSelected = currentProducts.length > 0 && selectedProducts.length === currentProducts.filter(p => selectedProducts.includes(p.id)).length && currentProducts.every(p => selectedProducts.includes(p.id));


  // --- Product Card Component for Card View ---
  const ProductAdminCard = ({ product }) => (
    <div className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col relative ${selectedProducts.includes(product.id) ? 'border-habesha_blue ring-2 ring-habesha_blue' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="absolute top-3 left-3 h-5 w-5 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue z-10"
        checked={selectedProducts.includes(product.id)}
        onChange={(e) => handleSelectProduct(e, product.id)}
      />
      <div className='relative p-2 pt-10'> {/* Added padding top for checkbox */}
        <img
          className='w-full h-48 object-contain bg-gray-50 rounded'
          src={product.image}
          alt={product.name}
        />
        <span className={`absolute top-3 right-3 text-xs capitalize px-2 py-1 rounded-full font-medium ${getStatusClass(product.status)}`}>
          {product.status}
        </span>
      </div>

      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='font-semibold text-habesha_blue text-md mb-1 truncate' title={product.name}>
          {product.name}
        </h3>
        <p className='text-xs text-gray-500 mb-1'>{product.category} <span className="mx-1">•</span> ID: {product.id}</p>
        <div className='flex items-center justify-between text-sm my-2'>
          <p className='text-gray-800 font-bold'>${product.price.toFixed(2)}</p>
          <p className={`font-medium text-xs ${product.stock > 5 ? 'text-gray-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            Stock: {product.stock}
          </p>
        </div>
        <p className="text-xs text-gray-400">Added: {product.dateAdded}</p>

        <div className='mt-auto pt-3 space-x-2 flex justify-end'>
          <button
            onClick={() => handleEditProduct(product.id)}
            className='p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors'
            title="Edit Product"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className='p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors'
            title="Delete Product"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6"> {/* Main container for the page */}
      {/* Header Section: Title and Add Product Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Products</h1>
        <button
          onClick={handleAddProduct}
          className="bg-habesha_blue hover:bg-opacity-90 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm flex items-center transition-colors text-sm"
        >
          <FiPlus className="mr-2 h-5 w-5" /> Add New Product
        </button>
      </div>

      {/* Filters, Search, and View Toggle Section */}
      <div className="p-4 bg-white rounded-xl shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <label htmlFor="searchProduct" className="sr-only">Search Products</label>
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="searchProduct"
              type="search"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent shadow-sm"
            />
          </div>
          {/* Category Filter */}
          <div>
            <label htmlFor="categoryFilter" className="block text-xs font-medium text-gray-500 mb-1">Category</label>
            <select
              id="categoryFilter"
              value={filterCategory}
              onChange={e => { setFilterCategory(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Categories</option>
              {[...new Set(initialMockProducts.map(p => p.category))].sort().map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Statuses</option>
              {[...new Set(initialMockProducts.map(p => p.status))].sort().map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
          </div>
          {/* Stock Filter */}
           <div>
            <label htmlFor="stockFilter" className="block text-xs font-medium text-gray-500 mb-1">Stock Level</label>
            <select
              id="stockFilter"
              value={filterStock}
              onChange={e => { setFilterStock(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-habesha_blue focus:border-transparent text-sm"
            >
              <option value="All">All Stock Levels</option>
              <option value="InStock">In Stock (above 5)</option>
              <option value="LowStock">Low Stock (1-5)</option>
              <option value="OutOfStock">Out of Stock (0)</option>
            </select>
          </div>
        </div>
        {/* Actions for selected items and view toggle */}
        <div className="flex flex-wrap items-center justify-between pt-3 gap-3">
          <div className="flex items-center space-x-3">
            {selectedProducts.length > 0 && (
              <button
                onClick={handleDeleteSelectedProducts}
                className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center px-3 py-1.5 rounded-md border border-red-300 hover:bg-red-50"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" /> Delete Selected ({selectedProducts.length})
              </button>
            )}
          </div>
          <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-habesha_blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            > <FiList size={18} />
            </button>
            <button
              onClick={() => setViewMode('card')}
              title="Card View"
              className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-habesha_blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            > <FiGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Listing Area: Table or Card View */}
      {viewMode === 'list' ? (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="p-4 w-12 text-left">
                    <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                      checked={isAllCurrentPageSelected && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      disabled={currentProducts.length === 0}
                    />
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU/ID</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Added</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors ${selectedProducts.includes(product.id) ? 'bg-habesha_blue/10' : ''}`}>
                    <td className="p-4">
                      <input type="checkbox" className="h-4 w-4 text-habesha_blue border-gray-300 rounded focus:ring-habesha_blue"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => handleSelectProduct(e, product.id)}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-16 w-12 rounded-md object-cover mr-4 shadow-sm border border-gray-100" src={product.image} alt={product.name} />
                        <span className="text-sm font-medium text-gray-800 truncate max-w-xs" title={product.name}>{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`font-medium ${product.stock > 5 ? 'text-gray-700' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(product.status)}`}>
                        <span className={`mr-1.5 h-2 w-2 rounded-full ${getStatusDotClass(product.status)}`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.dateAdded}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-1">
                      <button onClick={() => handleEditProduct(product.id)} className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100 transition-colors" title="Edit">
                        <FiEdit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-100 transition-colors" title="Delete">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAndSearchedProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FiPackage size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      ) : (
        // Card View
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                    <ProductAdminCard key={product.id} product={product} />
                ))}
            </div>
            {filteredAndSearchedProducts.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <FiPackage size={48} className="mx-auto mb-3 text-gray-400" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 pb-2 bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-b-xl shadow-xl mt-[-1px] z-0 relative">
          <div className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            <span className="hidden sm:inline"> (Total: {filteredAndSearchedProducts.length} products)</span>
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            > <FiChevronLeft className="h-5 w-5" />
            </button>
            {/* Page numbers could be generated here for more complex pagination */}
            {[...Array(totalPages).keys()].map(number => (
                 (number < 2 || number > totalPages - 3 || Math.abs(number + 1 - currentPage) < 2) && // Show first 2, last 2, and current +/- 1
                <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${currentPage === number + 1 ? 'z-10 bg-habesha_blue border-habesha_blue text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                >
                    {number + 1}
                </button>
            ))}
             {totalPages > 5 && currentPage < totalPages - 3 && <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>}


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

export default ManageProducts;