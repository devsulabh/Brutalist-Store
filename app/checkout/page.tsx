"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart, totalPrice } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalAmount = totalPrice;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items, totalAmount }),
      });

      if (!res.ok) {
        throw new Error("Checkout failed");
      }

      const data = await res.json();
      showToast("Order placed successfully!", "success");
      clearCart();
      router.push("/products"); // Redirect to products or success page
    } catch (err) {
      showToast("Failed to process checkout. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="checkout-container">
        <h1 className="checkout-title">CHECKOUT</h1>
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleCheckout}>
            <h2 className="section-title">Shipping Information</h2>
            <div className="form-group">
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Address" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="City" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Postal Code" required />
              </div>
            </div>
            
            <h2 className="section-title mt-6">Payment Information</h2>
            <div className="form-group">
              <input type="text" placeholder="Card Number (Demo)" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="CVC" required />
              </div>
            </div>

            <button type="submit" className="checkout-btn" disabled={loading || items.length === 0}>
              {loading ? "PROCESSING..." : `PAY $${totalAmount.toFixed(2)}`}
            </button>
          </form>

          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="items-list">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="summary-total">
                  <span>TOTAL</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  .checkout-container {
    background: #fff;
    border: 3px solid #1a1a1a;
    box-shadow: 8px 8px 0 #1a1a1a;
    padding: 3rem;
  }

  .checkout-title {
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    text-transform: uppercase;
    border-bottom: 3px solid #1a1a1a;
    padding-bottom: 1rem;
  }

  .checkout-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .mt-6 {
    margin-top: 2rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #1a1a1a;
    font-family: inherit;
    font-weight: 600;
    background: #fcfcfc;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    box-shadow: 4px 4px 0 #1a1a1a;
    transform: translate(-2px, -2px);
  }

  .checkout-btn {
    width: 100%;
    padding: 1.25rem;
    background: #1a1a1a;
    color: #fff;
    font-family: inherit;
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    border: 2px solid #1a1a1a;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .checkout-btn:hover:not(:disabled) {
    background: #ff3e00;
    color: #fff;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #1a1a1a;
  }

  .checkout-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .order-summary {
    background: #f8f8f8;
    padding: 2rem;
    border: 2px solid #1a1a1a;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #ccc;
  }

  .item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border: 2px solid #1a1a1a;
  }

  .item-details h4 {
    margin: 0 0 0.25rem 0;
    font-weight: 800;
    font-size: 0.9rem;
  }

  .item-details p {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
    font-weight: 600;
  }

  .item-price {
    margin-left: auto;
    font-weight: 900;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    font-weight: 900;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 3px solid #1a1a1a;
  }

  @media (max-width: 768px) {
    .checkout-grid {
      grid-template-columns: 1fr;
    }
  }
`;
