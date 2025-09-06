"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  async function fetchCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required!");
      return;
    }
    const res = await fetch("/api/cart", {
      headers: { Authorization: "Bearer " + token },
    });
    setCart(await res.json());
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

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>No items in cart</p>}
      <ul>
        {cart.map(c => (
          <li key={c.itemId._id}>
            {c.itemId.name} - ₹{c.itemId.price} × {c.quantity} = ₹{c.itemId.price * c.quantity}
            <button onClick={() => removeItem(c.itemId._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
