"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <html lang="en">
      <body>
        <nav style={{ marginBottom: "20px" }}>
          <Link href="/">Shop</Link> |{" "}
          <Link href="/signup">Signup</Link> |{" "}
          <Link href="/login">Login</Link> |{" "}
          <Link href="/cart">Cart</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </nav>
        {children}
      </body>
    </html>
  );
}
