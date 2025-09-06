import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <Link href="/">Items</Link> | 
        <Link href="/signup">Signup</Link> | 
        <Link href="/login">Login</Link> | 
        <Link href="/cart">Cart</Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
