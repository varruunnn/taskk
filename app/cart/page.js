"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Package, IndianRupee, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required!");
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        headers: { Authorization: "Bearer " + token },
      });
      setCart(await res.json());
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(itemId) {
    const token = localStorage.getItem("token");
    await fetch("/api/cart/" + itemId, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    fetchCart();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.itemId.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-600 mt-1">
                  {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <div className="flex items-center text-2xl font-bold text-green-600">
                  <IndianRupee className="h-6 w-6" />
                  <span>{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="text-center py-16 px-6">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to see items here!
              </p>
              <a 
                href="/"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <Package className="h-5 w-5" />
                <span>Continue Shopping</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(c => (
                <div 
                  key={c.itemId._id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image Placeholder */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {c.itemId.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">{c.itemId.price}</span>
                          <span className="text-gray-500">each</span>
                        </div>
                        
                        {/* Quantity and Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center bg-gray-100 rounded-lg">
                              <button className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors">
                                <Minus className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 font-medium text-gray-900 bg-white">
                                {c.quantity}
                              </span>
                              <button className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors">
                                <Plus className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(c.itemId._id)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="flex items-center text-lg font-bold text-gray-900">
                          <IndianRupee className="h-5 w-5" />
                          <span>{(c.itemId.price * c.quantity).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {c.quantity} × ₹{c.itemId.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      <span>{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      <span>{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <div className="flex items-center text-green-600">
                      <IndianRupee className="h-5 w-5" />
                      <span>{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-4">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Proceed to Checkout</span>
                </button>

                <a 
                  href="/"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Package className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}