"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "TOGGLE_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "LOAD"; payload: WishlistItem[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "LOAD":
      return { items: action.payload };
    default:
      return state;
  }
}

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    } catch { /* ignore */ }
  }, [state.items]);

  const isWishlisted = useCallback(
    (id: string) => state.items.some((i) => i.id === id),
    [state.items]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem) => dispatch({ type: "TOGGLE_ITEM", payload: item }),
    []
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    []
  );

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        totalItems: state.items.length,
        isWishlisted,
        toggleWishlist,
        removeItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
