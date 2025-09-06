"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Package, IndianRupee } from "lucide-react";

export default function ProductBrowser({ initialItems }) {
    const [items, setItems] = useState(initialItems || []);
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
    }

    async function addToCart(itemId) {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Login required!");
            return;
        }
        await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
            body: JSON.stringify({ itemId, quantity: 1 }),
        });
        alert("Item added to cart!");
    }

    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat || "All Categories"}
                            </option>
                        ))}
                    </select>
                    <input
                        placeholder="Min Price"
                        type="number"
                        value={filters.min}
                        onChange={e => setFilters({ ...filters, min: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    />
                    <input
                        placeholder="Max Price"
                        type="number"
                        value={filters.max}
                        onChange={e => setFilters({ ...filters, max: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    />
                    <button
                        onClick={fetchItems}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm border p-4">
                        <div className="h-48 bg-gray-100 flex items-center justify-center mb-4">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            ) : (
                                <Package className="h-16 w-16 text-gray-400" />
                            )}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h3>
                        <div className="flex items-center mb-2">
                            <IndianRupee className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-bold">{item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <button
                            onClick={() => addToCart(item._id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
