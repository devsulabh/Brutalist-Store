"use client";

import React from "react";
import styled from "styled-components";
import { useCart } from "@/lib/cart-context";
import CartItem from "./cart-item";
import Link from "next/link";

const CartDrawer = () => {
  const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <StyledWrapper>
      <div className="overlay" onClick={closeCart} />
      <div className="drawer">
        <div className="drawer-header">
          <h3 className="drawer-title">
            YOUR CART <span className="item-count">({totalItems})</span>
          </h3>
          <button className="close-btn" onClick={closeCart}>
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">🛒</span>
              <p className="empty-text">YOUR CART IS EMPTY</p>
              <p className="empty-sub">Add some brutalist goods!</p>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="subtotal-label">SUBTOTAL</span>
              <span className="subtotal-value">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="footer-actions">
              <Link href="/cart" className="view-cart-btn" onClick={closeCart}>
                VIEW FULL CART
              </Link>
              <button className="checkout-btn">
                CHECKOUT →
              </button>
            </div>
            <button className="clear-btn" onClick={clearCart}>
              CLEAR ALL
            </button>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    animation: fade-in 0.2s ease;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .drawer {
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    max-width: 90vw;
    height: 100%;
    background: #fdfcf0;
    border-left: 4px solid #1a1a1a;
    box-shadow: -8px 0 0 #1a1a1a;
    display: flex;
    flex-direction: column;
    animation: slide-in 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.5rem;
    border-bottom: 3px solid #1a1a1a;
    background: #1a1a1a;
    color: #fdfcf0;
  }

  .drawer-title {
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin: 0;
  }

  .item-count {
    color: #ff3e00;
  }

  .close-btn {
    background: none;
    border: 2px solid #fdfcf0;
    color: #fdfcf0;
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: #ff3e00;
    border-color: #ff3e00;
    transform: rotate(90deg);
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 3rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.4;
  }

  .empty-text {
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #1a1a1a;
    margin: 0 0 0.3rem;
  }

  .empty-sub {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
  }

  .drawer-footer {
    padding: 1rem 1.5rem 1.5rem;
    border-top: 3px solid #1a1a1a;
    background: #f5f5f0;
  }

  .subtotal-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .subtotal-label {
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: #666;
  }

  .subtotal-value {
    font-size: 1.5rem;
    font-weight: 900;
    color: #1a1a1a;
  }

  .footer-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
  }

  .view-cart-btn {
    flex: 1;
    padding: 0.7rem;
    background: #fdfcf0;
    border: 3px solid #1a1a1a;
    color: #1a1a1a;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 3px 3px 0 #1a1a1a;
    text-decoration: none;
    display: block;
  }

  .view-cart-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #1a1a1a;
  }

  .checkout-btn {
    flex: 1;
    padding: 0.7rem;
    background: #ff3e00;
    border: 3px solid #1a1a1a;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 3px 3px 0 #1a1a1a;
  }

  .checkout-btn:hover {
    background: #ff6d43;
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #1a1a1a;
  }

  .clear-btn {
    width: 100%;
    background: none;
    border: none;
    color: #999;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    padding: 0.3rem;
    transition: color 0.2s;
  }

  .clear-btn:hover {
    color: #ff3d3d;
  }
`;

export default CartDrawer;
