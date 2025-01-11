import React, { useState, useEffect } from "react";
import { Items, items } from "@/db/items";
type CartType = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export function ProductTable() {
  const [cart, setCart] = useState<CartType[]>([]);

  // Convert products into a map for O(1) lookup
  const productsArray = items;
  const productsMap = new Map(items.map((product) => [product.value, product]));

  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const Event = event as CustomEvent<string>;
      const productId = Event.detail;
      addToCartById(productId);
    };

    const handleRemoveFromCart = (event: Event) => {
      console.log("Remove-from-cart event triggered");
      const Event = event as CustomEvent<string>;
      const productId = Event.detail;
      console.log("Product ID:", productId);
      removeFromCart(productId);
    };

    window.addEventListener("add-to-cart", handleAddToCart);
    window.addEventListener("remove-from-cart", handleRemoveFromCart);

    console.log("Event listeners added");

    return () => {
      console.log("Cleaning up event listeners");
      window.removeEventListener("add-to-cart", handleAddToCart);
      window.removeEventListener("remove-from-cart", handleRemoveFromCart);
    };
  }, []);

  const addToCartById = (productId: string) => {
    const product = productsMap.get(productId);
    if (!product) return; // If product doesn't exist, exit the function

    setCart((prevCart) => {
      const existingProduct = prevCart.some((item) => item.id === productId);
      if (existingProduct) {
        return prevCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.value,
            name: product.name,
            price: product.price,
            qty: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <>
      <h1>Products</h1>

      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.qty}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h2>
        Total: ${cart.reduce((total, item) => total + item.price * item.qty, 0)}
      </h2>
    </>
  );
}

export default function App() {
  return (
    <div>
      <ProductTable />
    </div>
  );
}
