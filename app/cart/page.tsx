"use client";

import React from "react";
import styled from "styled-components";
import { useCart } from "@/lib/cart-context";
import CartItem from "@/components/cart/cart-item";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();

  return (
    <StyledWrapper>
      <div className="cart-page">
        <div className="cart-header">
          <h1 className="cart-title">YOUR CART</h1>
          <span className="cart-count">{totalItems} items</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h2 className="empty-title">YOUR CART IS EMPTY</h2>
            <p className="empty-desc">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link href="/products">
              <Button variant="primary">START SHOPPING →</Button>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <div className="items-header">
                <span className="header-product">PRODUCT</span>
                <span className="header-qty">QTY</span>
                <span className="header-total">TOTAL</span>
              </div>
              <div className="items-list">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <button className="clear-cart-btn" onClick={clearCart}>
                CLEAR ALL ITEMS
              </button>
            </div>

            <div className="order-summary">
              <div className="summary-card">
                <h3 className="summary-title">ORDER SUMMARY</h3>

                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="summary-value">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="summary-value free">
                    {totalPrice >= 99 ? "FREE" : "$9.99"}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (est.)</span>
                  <span className="summary-value">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-row total-row">
                  <span>TOTAL</span>
                  <span className="total-value">
                    $
                    {(
                      totalPrice +
                      (totalPrice >= 99 ? 0 : 9.99) +
                      totalPrice * 0.08
                    ).toFixed(2)}
                  </span>
                </div>

                {totalPrice < 99 && (
                  <div className="free-shipping-notice">
                    Add ${(99 - totalPrice).toFixed(2)} more for FREE shipping!
                  </div>
                )}

                <Button variant="primary" size="lg">
                  PROCEED TO CHECKOUT
                </Button>

                <div className="trust-badges">
                  <span>🔒 Secure</span>
                  <span>🚚 Fast</span>
                  <span>↩️ Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cart-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .cart-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #1a1a1a;
  }

  .cart-title {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 0.02em;
    margin: 0;
  }

  .cart-count {
    font-size: 0.85rem;
    color: #888;
    font-weight: 700;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    border: 3px dashed #ddd;
  }

  .empty-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 1.3rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin: 0 0 0.5rem;
  }

  .empty-desc {
    font-size: 0.9rem;
    color: #888;
    margin: 0 0 1.5rem;
  }

  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
    align-items: start;
  }

  .items-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #999;
    border-bottom: 2px solid #eee;
    margin-bottom: 0.8rem;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .clear-cart-btn {
    background: none;
    border: none;
    color: #ff3d3d;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    cursor: pointer;
    padding: 0.5rem 0;
    transition: opacity 0.2s;
  }

  .clear-cart-btn:hover {
    opacity: 0.7;
  }

  .summary-card {
    background: #fff;
    border: 3px solid #1a1a1a;
    box-shadow: 6px 6px 0 #1a1a1a;
    padding: 1.5rem;
    position: sticky;
    top: 80px;
  }

  .summary-title {
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    margin: 0 0 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1a1a1a;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
    padding: 0.5rem 0;
  }

  .summary-value {
    color: #1a1a1a;
    font-weight: 800;
  }

  .summary-value.free {
    color: #00c853;
  }

  .summary-divider {
    border-top: 2px dashed #ddd;
    margin: 0.5rem 0;
  }

  .total-row {
    font-size: 1rem;
    font-weight: 900;
    color: #1a1a1a;
    padding: 0.8rem 0;
  }

  .total-value {
    font-size: 1.4rem;
    font-weight: 900;
    color: #ff3e00;
  }

  .free-shipping-notice {
    font-size: 0.75rem;
    font-weight: 700;
    color: #ff3e00;
    background: #fff5f0;
    border: 2px solid #ff3e00;
    padding: 0.5rem 0.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .summary-card > div:last-of-type {
    margin-top: 1rem;
  }

  .trust-badges {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #888;
  }

  @media (max-width: 768px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }

    .cart-title {
      font-size: 1.4rem;
    }
  }
`;
