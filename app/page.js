"use client";
import { useEffect, useState } from "react";
import { Search, Filter, ShoppingCart, Star, Heart, Eye } from "lucide-react";

export default function HomePage() {
  const [items, setItems] = useState([
    // Sample data for demonstration
    {
      _id: "1",
      name: "Premium Wireless Headphones",
      price: 12999,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124
    },
    {
      _id: "2",
      name: "Minimalist Watch",
      price: 8999,
      category: "Fashion",
      description: "Clean, elegant timepiece with premium leather strap and Swiss movement.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 89
    },
    {
      _id: "3",
      name: "Organic Coffee Beans",
      price: 1299,
      category: "Food",
      description: "Freshly roasted organic coffee beans from sustainable farms.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 234
    },
    {
      _id: "4",
      name: "Yoga Mat Pro",
      price: 3499,
      category: "Fitness",
      description: "Professional-grade yoga mat with superior grip and cushioning.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156
    }
  ]);
  const [filters, setFilters] = useState({ category: "", min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  // Simulated user state - in real app this would come from context/auth
  const [user, setUser] = useState({ token: "demo-token", name: "John Doe" });

  async function fetchItems() {
    // In real implementation, this would make an API call
    // For now, we'll filter the sample data
    let filteredItems = items.filter(item => {
      const matchesCategory = !filters.category || item.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchesMin = !filters.min || item.price >= parseInt(filters.min);
      const matchesMax = !filters.max || item.price <= parseInt(filters.max);
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesMin && matchesMax && matchesSearch;
    });
    
    // Simulate API delay
    setTimeout(() => setItems(filteredItems), 100);
  }

  useEffect(() => {
    fetchItems();
  }, [filters, searchQuery]);

  async function addToCart(itemId) {
    if (!user.token) {
      alert("Please login to add items to cart!");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      alert("Item added to cart successfully!");
    }, 200);
  }

  function toggleWishlist(itemId) {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(itemId)) {
      newWishlist.delete(itemId);
    } else {
      newWishlist.add(itemId);
    }
    setWishlist(newWishlist);
  }

  function resetFilters() {
    setFilters({ category: "", min: "", max: "" });
    setSearchQuery("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MinimalShop</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Food">Food</option>
                    <option value="Fitness">Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.min}
                    onChange={(e) => setFilters({ ...filters, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={filters.max}
                    onChange={(e) => setFilters({ ...filters, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <button
                    onClick={fetchItems}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleWishlist(item._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${wishlist.has(item._id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                    />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}