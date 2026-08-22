"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchValue.trim())}`;
    }
  };

  return (
    <StyledWrapper>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">BRUTALIST</span>
            <span className="logo-sub">STORE</span>
          </Link>

          <div className="nav-links">
            <Link href="/products" className="nav-link">
              SHOP
            </Link>
            <Link href="/products?category=Electronics" className="nav-link">
              ELECTRONICS
            </Link>
            <Link href="/products?category=Clothing" className="nav-link">
              CLOTHING
            </Link>
          </div>

          <div className="nav-actions">
            <button
              className="action-btn search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
            >
              🔍
            </button>

            <Link href="/login" className="action-btn" aria-label="Account">
              👤
            </Link>

            <button
              className="action-btn cart-btn"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              🛒
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
              className="search-input"
            />
            <button type="submit" className="search-submit">
              GO →
            </button>
          </form>
        )}
      </nav>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fdfcf0;
    border-bottom: 3px solid #1a1a1a;
    box-shadow: 0 4px 0 #1a1a1a;
  }

  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1.5rem;
    gap: 1.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-icon {
    font-size: 1.8rem;
    transform: rotate(-12deg);
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .logo:hover .logo-icon {
    transform: rotate(12deg) scale(1.2);
  }

  .logo-text {
    font-weight: 900;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    color: #1a1a1a;
    text-transform: uppercase;
  }

  .logo-sub {
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: #ff3e00;
    background: #1a1a1a;
    padding: 2px 6px;
    transform: rotate(-2deg);
    display: inline-block;
    margin-left: -2px;
  }

  .nav-links {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }

  .nav-link {
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    padding: 0.5rem 0.9rem;
    color: #1a1a1a;
    text-decoration: none;
    position: relative;
    transition: all 0.2s ease;
    border: 2px solid transparent;
  }

  .nav-link:hover {
    background: #1a1a1a;
    color: #fdfcf0;
    transform: rotate(-1deg);
    border-color: #1a1a1a;
  }

  .nav-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .action-btn {
    background: none;
    border: 2px solid #1a1a1a;
    padding: 0.45rem 0.7rem;
    font-size: 1.1rem;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 3px 3px 0 #1a1a1a;
    color: #1a1a1a;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #1a1a1a;
    background: #ffef00;
  }

  .action-btn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #1a1a1a;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff3e00;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 900;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1a1a1a;
    animation: badge-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes badge-pop {
    0% { transform: scale(0); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .search-bar {
    display: flex;
    border-top: 2px solid #1a1a1a;
    animation: slide-down 0.2s ease-out;
  }

  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .search-input {
    flex: 1;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    font-family: monospace;
    border: none;
    outline: none;
    background: #fff;
    color: #1a1a1a;
    letter-spacing: 0.03em;
  }

  .search-input::placeholder {
    color: #999;
  }

  .search-submit {
    padding: 0.8rem 1.5rem;
    background: #1a1a1a;
    color: #fdfcf0;
    font-weight: 900;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  .search-submit:hover {
    background: #ff3e00;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .logo-text {
      font-size: 1.1rem;
    }
  }
`;

export default Navbar;
