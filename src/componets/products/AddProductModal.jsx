// src/components/products/AddProductModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import productService from '../../service/productService';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    image: '',
    description: '',
    dateAdded: new Date().toISOString().split('T')[0],
  });
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Fetch categories and statuses for dropdowns
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, statRes] = await Promise.all([
          productService.getUniqueCategories(),
          productService.getUniqueStatuses(),
        ]);
        setCategories(catRes.data);
        setStatuses(statRes.data);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Product name is required.');
      return;
    }
    if (formData.price < 0) {
      alert('Price must be positive.');
      return;
    }
    if (formData.stock < 0) {
      alert('Stock cannot be negative.');
      return;
    }
    try {
      await onAddProduct(formData);
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'Active',
        image: '',
        description: '',
        dateAdded: new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (error) {
      alert(`Failed to add product: ${error.message || 'Server error'}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">Price ($)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-600">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">Image URL</label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habesha_blue"
            ></textarea>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;