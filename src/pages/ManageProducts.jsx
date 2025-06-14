// src/pages/ManageProducts.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ProductListHeader from '../componets/products/ ProductListHeader';
import ProductFilters from '../componets/products/ProductFilters';
import ProductTable from '../componets/products/ProductTable';
import ProductCardGrid from '../componets/products/ProductCardGrid';
import NoProductsFound from '../componets/products/NoProductsFound';
import PaginationControls from '../componets/products/PaginationControls';
import AddProductModal from '../componets/products/AddProductModal';
import productService from '../service/productService';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';

const PRODUCTS_PER_PAGE = 6;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStock, setFilterStock] = useState('All');
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]); // Fixed typo: statusesshe → statuses
  const [viewMode, setViewMode] = useState('list');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from the service
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedProducts([]);
    try {
      const params = {
        page: currentPage,
        limit: PRODUCTS_PER_PAGE,
        searchTerm: searchTerm || undefined,
        category: filterCategory === 'All' ? undefined : filterCategory,
        status: filterStatus === 'All' ? undefined : filterStatus,
        stock: filterStock === 'All' ? undefined : filterStock,
      };
      const response = await productService.getProducts(params);
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterCategory, filterStatus, filterStock]);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [catRes, statRes] = await Promise.all([
          productService.getUniqueCategories(),
          productService.getUniqueStatuses(),
        ]);
        setCategories(['All', ...catRes.data]);
        setStatuses(['All', ...statRes.data]);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
        setCategories(['All', ...[...new Set(productService.initialMockProducts.map((p) => p.category))].sort()]);
        setStatuses(['All', ...[...new Set(productService.initialMockProducts.map((p) => p.status))].sort()]);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers for filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };
  const handleStockChange = (e) => {
    setFilterStock(e.target.value);
    setCurrentPage(1);
  };
  const handleViewModeChange = (mode) => setViewMode(mode);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  // CRUD Operations
  const handleAddProduct = async (productData) => {
    try {
      setLoading(true);
      await productService.addProduct({
        ...productData,
        price: parseFloat(productData.price), // Ensure price is a number
        stock: parseInt(productData.stock, 10), // Ensure stock is an integer
      });
      setIsModalOpen(false);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Failed to add product:', error);
      alert(`Failed to add product: ${error.message || 'Server error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    alert(`Implement Edit Product ID: ${productId}. Open form/modal, then call productService.updateProduct() and refresh list.`);
    // To implement: Open a modal with pre-filled data and call productService.updateProduct
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(`Are you sure you want to delete product ID: ${productId}?`)) {
      try {
        setLoading(true);
        await productService.deleteProduct(productId);
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchProducts();
        }
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert(`Failed to delete product ${productId}: ${err.message || 'Server error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      alert('No products selected.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} selected product(s)?`)) {
      try {
        setLoading(true);
        await productService.deleteMultipleProducts(selectedProducts);
        setSelectedProducts([]);
        if (products.length === selectedProducts.length && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchProducts();
        }
      } catch (err) {
        console.error('Failed to delete selected products:', err);
        alert(`Failed to delete selected products: ${err.message || 'Server error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Selection Logic
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (event, productId) => {
    if (event.target.checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const isAllCurrentPageSelected = products.length > 0 && selectedProducts.length === products.length;

  // Render logic
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12 text-gray-500">
          <FiLoader size={48} className="mx-auto mb-3 text-habesha_blue animate-spin" />
          <p className="text-lg font-medium">Loading products...</p>
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
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-habesha_blue text-white rounded hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      );
    }
    if (products.length === 0) {
      const isFiltered = searchTerm || filterCategory !== 'All' || filterStatus !== 'All' || filterStock !== 'All';
      return (
        <NoProductsFound
          message={isFiltered ? 'No products match your criteria' : 'No products available'}
          subMessage={isFiltered ? 'Try adjusting your search or filters.' : 'Add a new product to get started!'}
        />
      );
    }
    if (viewMode === 'list') {
      return (
        <ProductTable
          products={products}
          selectedProducts={selectedProducts}
          onSelectAll={handleSelectAll}
          onSelectProduct={handleSelectProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          isAllCurrentPageSelected={isAllCurrentPageSelected}
        />
      );
    }
    return (
      <ProductCardGrid
        products={products}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
      <ProductListHeader onAddProduct={() => setIsModalOpen(true)} />
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterCategory={filterCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        filterStatus={filterStatus}
        onStatusChange={handleStatusChange}
        statuses={statuses}
        filterStock={filterStock}
        onStockChange={handleStockChange}
        selectedProductsCount={selectedProducts.length}
        onDeleteSelected={handleDeleteSelectedProducts}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      {renderContent()}
      {!loading && !error && products.length > 0 && totalPages > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalProducts}
        />
      )}
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ManageProducts;