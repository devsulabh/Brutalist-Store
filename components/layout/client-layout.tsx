"use client";

import React from "react";
import { CartProvider } from "@/lib/cart-context";
import { ToastProvider } from "@/lib/toast-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import Navbar from "@/components/layout/navbar";
import CartDrawer from "@/components/cart/cart-drawer";
import Footer from "@/components/layout/footer";
import ToastContainer from "@/components/ui/toast";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
