import React, { useState, useEffect } from "react";
import { Items, items } from "@/db/items";
import { InputCounter } from "@/components/ui/input-counter";
import { X, Banknote } from "lucide-react";
type CartType = {
  id: string;
  name: string;
  qty: number;
  price: number;
  minprice: number;
  conversion: number;
  img: string;
  total: number;
  description: string;
};

export function TargetTable() {
  const [cart, setCart] = useState<CartType[]>([]);

  const productsMap = new Map(items.map((product) => [product.value, product]));

  //////////////////
  //CART DEBUGGER//
  /////////////////
  useEffect(() => {
    const items = cart.reduce((acc, item) => {
      acc[item.id] = item.qty; // Add each item to the accumulator
      return acc;
    }, {} as Record<string, number>);

    const event = new CustomEvent("add-items", { detail: items });
    window.dispatchEvent(event);

    const subtotal = new CustomEvent("update-subtotal", {
      detail: cart.reduce((total, item) => total + item.price * item.qty, 0),
    });
    window.dispatchEvent(subtotal);
  }, [cart]);
  //////////////////

  ////////////////////////
  // FUNCTION CONNECT TO SUBMIT FORM
  ///////////////////////////

  //////////////////////
  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent<CartType>;
      
      addToCartById(customEvent.detail);
      // console.log(customEvent.detail);
    };

    const handleRemoveFromCart = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      removeFromCart(customEvent.detail);
    };

    window.addEventListener("add-to-cart", handleAddToCart);
    window.addEventListener("remove-from-cart", handleRemoveFromCart);

    return () => {
      window.removeEventListener("add-to-cart", handleAddToCart);
      window.removeEventListener("remove-from-cart", handleRemoveFromCart);
    };
  }, []);

  const addToCartById = (product: CartType) => {
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          minprice: product.minprice,
          conversion: product.conversion,
          qty: 1,
          total: product.price,
          img: product.img,
          description: product.description,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty, total: qty * item.price  } : item
      )
    );
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="flex flex-col gap-[1px] bg-border px-[1px] py-[1px] rounded-lg">
          {cart.map((item) => (
            <li key={item.id} className="flex  flex-col bg-white rounded-lg">
              <div className="flex  p-2 ">
                <img
                  className="w-[5rem] aspect-square rounded-md"
                  src={item.img}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <label
                        className="text-sm font-medium leading-none"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {item.name}
                      </label>
                      <label
                        className="text-[0.8rem] text-muted-foreground"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {item.description}
                      </label>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <X className=" w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-end justify-between">
                      <label className="text-sm font-bold text-muted-foreground leading-none">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item.price)}
                      </label>
                    </div>
                    <InputCounter
                      value={item.qty}
                      onChange={(qty) => updateQuantity(item.id, qty)}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* <h2>
        Total:{" "}
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(
          cart.reduce((total, item) => total + item.price * item.qty, 0)
        )}
      </h2> */}
    </div>
  );
}
