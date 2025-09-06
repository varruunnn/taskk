"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Package, IndianRupee, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
export default function ProductBrowser({ initialItems }) {
    const [items, setItems] = useState(initialItems || [
        { _id: '1', name: 'Premium Running Shoes', price: 4999, category: 'Footwear', description: 'Comfortable running shoes with advanced cushioning technology', image: null },
        { _id: '2', name: 'Wireless Headphones', price: 2999, category: 'Electronics', description: 'High-quality wireless headphones with noise cancellation', image: null },
        { _id: '3', name: 'Cotton T-Shirt', price: 799, category: 'Clothing', description: 'Soft cotton t-shirt available in multiple colors', image: null },
        { _id: '4', name: 'Leather Wallet', price: 1499, category: 'Accessories', description: 'Genuine leather wallet with multiple card slots', image: null },
        { _id: '5', name: 'Casual Sneakers', price: 3499, category: 'Footwear', description: 'Stylish casual sneakers for everyday wear', image: null },
        { _id: '6', name: 'Smart Watch', price: 8999, category: 'Electronics', description: 'Feature-rich smartwatch with health monitoring', image: null }
    ]);
    const [filters, setFilters] = useState({ category: "", min: "", max: "" });
    const categories = ["", "Footwear", "Clothing", "Electronics", "Accessories"];
    
    async function fetchItems() {
        let query = [];
        if (filters.category) query.push(`category=${filters.category}`);
        if (filters.min) query.push(`minPrice=${filters.min}`);
        if (filters.max) query.push(`maxPrice=${filters.max}`);
        const res = await fetch(`/api/items?${query.join("&")}`);
        const data = await res.json();
        setItems(data);
        toast.success("Filters applied!");
    }

    async function addToCart(itemId) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Login required!");
            return;
        }
        try {
            await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({ itemId, quantity: 1 }),
            });
            toast.success("Item added to cart!");
        } catch (err) {
            toast.error("Failed to add item to cart!");
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-10">
                    <div className="flex items-center mb-6">
                        <Filter className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat || "All Categories"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Min Price</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                <input
                                    placeholder="0"
                                    type="number"
                                    value={filters.min}
                                    onChange={e => setFilters({ ...filters, min: e.target.value })}
                                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Max Price</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                <input
                                    placeholder="999999"
                                    type="number"
                                    value={filters.max}
                                    onChange={e => setFilters({ ...filters, max: e.target.value })}
                                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Apply</label>
                            <button
                                onClick={fetchItems}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                            >
                                Filter Results
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Products ({items.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        Showing all available products
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map(item => (
                        <div key={item._id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:scale-105">
                            {/* Product Image */}
                            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                    />
                                ) : (
                                    <Package className="h-20 w-20 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                                </div>
                            </div>
                            
                            {/* Product Details */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                                        {item.name}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center bg-green-50 rounded-lg px-3 py-1">
                                        <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
                                        <span className="text-green-700 font-bold text-lg">{item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>
                                
                                <button
                                    onClick={() => addToCart(item._id)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {items.length === 0 && (
                    <div className="text-center py-16">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                    </div>
                )}
            </div>
        </div>
    );
}