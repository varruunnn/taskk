import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ShopHub",
  description: "Your one-stop e-commerce destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main>{children}
            <Toaster position="top-right" />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}