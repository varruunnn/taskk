"use client";

import Link from "next/link";
import { Store, ShoppingCart, UserPlus, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth(); 

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Store className="h-8 w-8 text-blue-600" />
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShopHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              <Store className="h-4 w-4" />
              <span>Shop</span>
            </Link>

            {!isLoggedIn ? (
              <>
                <Link href="/signup" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                  <UserPlus className="h-4 w-4" />
                  <span>Signup</span>
                </Link>
                <Link href="/login" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/cart" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <button
                  onClick={logout} // Use logout from context
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}