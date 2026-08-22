"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import type { CartItem as CartItemType } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <StyledWrapper>
      <div className="cart-item">
        <div className="item-image">
          {item.image.startsWith("http") ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="50px"
            />
          ) : (
            <span className="item-emoji">{item.image}</span>
          )}
        </div>

        <div className="item-info">
          <h4 className="item-name">{item.name}</h4>
          <span className="item-price">${item.price.toFixed(2)}</span>
        </div>

        <div className="item-controls">
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              −
            </button>
            <span className="qty-val">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <span className="item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <button
          className="remove-btn"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cart-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    border: 2px solid #1a1a1a;
    box-shadow: 3px 3px 0 #1a1a1a;
    background: #fff;
    position: relative;
    transition: all 0.2s ease;
  }

  .cart-item:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 #1a1a1a;
  }

  .item-image {
    width: 50px;
    height: 50px;
    background: #f5f5f0;
    border: 2px solid #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .item-emoji {
    font-size: 1.5rem;
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-name {
    font-size: 0.85rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-price {
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
  }

  .item-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.3rem;
  }

  .qty-control {
    display: inline-flex;
    align-items: center;
    border: 2px solid #1a1a1a;
  }

  .qty-btn {
    background: #fdfcf0;
    border: none;
    padding: 0.15rem 0.5rem;
    font-size: 0.85rem;
    font-weight: 900;
    cursor: pointer;
    transition: background 0.15s;
  }

  .qty-btn:hover {
    background: #1a1a1a;
    color: #fdfcf0;
  }

  .qty-val {
    padding: 0.15rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 900;
    border-left: 2px solid #1a1a1a;
    border-right: 2px solid #1a1a1a;
    min-width: 28px;
    text-align: center;
  }

  .item-total {
    font-size: 0.85rem;
    font-weight: 900;
    color: #ff3e00;
  }

  .remove-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    background: #ff3d3d;
    border: 2px solid #1a1a1a;
    color: #fff;
    font-size: 0.6rem;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    opacity: 0;
  }

  .cart-item:hover .remove-btn {
    opacity: 1;
  }

  .remove-btn:hover {
    transform: scale(1.2) rotate(90deg);
  }
`;

export default CartItem;
