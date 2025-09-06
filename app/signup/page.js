"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Store, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
export default  function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  async function handleSignup(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    if (res.ok) {
      alert("Account created successfully! Please login.");
      router.push('/login');
    } else {
      alert(data.error || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
      
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md relative z-10">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full opacity-20"></div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Join us and start shopping</p>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password should be at least 6 characters long
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <UserPlus className="h-5 w-5" />
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
