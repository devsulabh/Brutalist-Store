"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Rating from "@/components/products/rating";
import type { Product } from "@/lib/data/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showToast(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showToast(
      wishlisted ? `Removed from wishlist` : `Added to wishlist ❤️`,
      wishlisted ? "info" : "success"
    );
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <StyledWrapper>
      <Link href={`/products/${product.id}`} className="card-link">
        <div className="product-card">
          <div className="card-image-area">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
            {product.tag && <span className="product-tag">{product.tag}</span>}
            {discount > 0 && (
              <span className="discount-badge">-{discount}%</span>
            )}
            <div
              role="button"
              tabIndex={0}
              className={`wishlist-btn ${wishlisted ? "active" : ""}`}
              onClick={handleToggleWishlist}
              onKeyDown={(e) => e.key === "Enter" && handleToggleWishlist(e as any)}
              aria-label="Toggle wishlist"
            >
              {wishlisted ? "♥" : "♡"}
            </div>
          </div>

          <div className="card-content">
            <span className="category-label">{product.category}</span>
            <h3 className="product-name">{product.name}</h3>

            <div className="rating-row">
              <Rating value={product.rating} readOnly size={16} name={`card-${product.id}`} />
              <span className="review-count">({product.reviewCount})</span>
            </div>

            <div className="price-row">
              <div className="price-group">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="original-price">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div
                role="button"
                tabIndex={0}
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                onKeyDown={(e) => e.key === "Enter" && handleAddToCart(e as any)}
                aria-label="Add to cart"
              >
                + Cart
              </div>
            </div>
          </div>

          <div className="card-pattern" />
        </div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .product-card {
    position: relative;
    background: #fff;
    border: 3px solid #1a1a1a;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 5px 5px 0 #1a1a1a;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .product-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #1a1a1a;
  }

  .product-card:active {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 #1a1a1a;
  }

  .card-image-area {
    position: relative;
    background: linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 100%);
    min-height: 220px;
    border-bottom: 3px solid #1a1a1a;
    overflow: hidden;
  }

  .product-tag {
    position: absolute;
    top: 0.8rem;
    left: 0;
    background: #ff3e00;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    padding: 0.3rem 0.8rem 0.3rem 0.5rem;
    border: 2px solid #1a1a1a;
    border-left: none;
    z-index: 2;
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  }

  .discount-badge {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    background: #ffef00;
    color: #1a1a1a;
    font-size: 0.7rem;
    font-weight: 900;
    padding: 0.3rem 0.5rem;
    border: 2px solid #1a1a1a;
    transform: rotate(3deg);
    z-index: 2;
    box-shadow: 2px 2px 0 #1a1a1a;
  }

  .wishlist-btn {
    position: absolute;
    bottom: 0.8rem;
    right: 0.8rem;
    width: 36px;
    height: 36px;
    background: #fff;
    border: 2px solid #1a1a1a;
    box-shadow: 2px 2px 0 #1a1a1a;
    font-size: 1.1rem;
    cursor: pointer;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: 0;
  }

  .product-card:hover .wishlist-btn {
    opacity: 1;
  }

  .wishlist-btn.active {
    opacity: 1;
    background: #ff3d3d;
    color: #fff;
  }

  .wishlist-btn:hover {
    transform: scale(1.15);
  }

  .card-content {
    padding: 1rem 1.2rem 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .category-label {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4d61ff;
    margin-bottom: 0.3rem;
  }

  .product-name {
    font-size: 1rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 0.5rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.8rem;
  }

  .review-count {
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
  }

  .price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.8rem;
    border-top: 2px dashed #eee;
  }

  .price-group {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .current-price {
    font-size: 1.3rem;
    font-weight: 900;
    color: #1a1a1a;
  }

  .original-price {
    font-size: 0.85rem;
    color: #999;
    text-decoration: line-through;
    font-weight: 600;
  }

  .add-to-cart-btn {
    background: #1a1a1a;
    color: #fdfcf0;
    border: 2px solid #1a1a1a;
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
  }

  .add-to-cart-btn:hover {
    background: #ff3e00;
    border-color: #ff3e00;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #1a1a1a;
  }

  .add-to-cart-btn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #1a1a1a;
  }

  .card-pattern {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.03) 4px,
      rgba(0, 0, 0, 0.03) 8px
    );
    pointer-events: none;
  }
`;

export default ProductCard;
