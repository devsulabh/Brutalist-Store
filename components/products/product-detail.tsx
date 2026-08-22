"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Rating from "@/components/products/rating";
import Button from "@/components/ui/button";
import type { Product } from "@/lib/data/products";
import { getReviewsByProduct } from "@/lib/data/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";
import ProductReviews from "@/components/products/product-reviews";
import Link from "next/link";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

const ProductDetail = ({ product, relatedProducts = [] }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const reviews = getReviewsByProduct(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    showToast(`${quantity}x ${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showToast(
      wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️",
      wishlisted ? "info" : "success"
    );
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const allImages = product.images.length > 0 ? product.images : [product.image];

  return (
    <StyledWrapper>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">→</span>
        <Link href="/products">Products</Link>
        <span className="separator">→</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="detail-layout">
        <div className="image-section">
          <div className="main-image">
            <Image
              src={allImages[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
            {product.tag && <span className="image-tag">{product.tag}</span>}
          </div>
          {allImages.length > 1 && (
            <div className="thumbnail-strip">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${selectedImage === i ? "active" : ""}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="info-section">
          <span className="category-badge">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-section">
            <Rating value={product.rating} readOnly size={22} name={`detail-${product.id}`} />
            <span className="review-text">
              {product.rating}/5 • {product.reviewCount} reviews
            </span>
          </div>

          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="discount-tag">SAVE {discount}%</span>
              </>
            )}
          </div>

          <p className="description">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="color-section">
              <h4 className="option-label">COLOR</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-swatch ${selectedColor === color ? "active" : ""}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="quantity-section">
            <h4 className="option-label">QUANTITY</h4>
            <div className="quantity-control">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-section">
            <div className="action-buttons">
              <Button variant="primary" size="lg" onClick={handleAddToCart}>
                ADD TO CART — ${(product.price * quantity).toFixed(2)}
              </Button>
              <button
                className={`wishlist-action ${wishlisted ? "active" : ""}`}
                onClick={handleToggleWishlist}
              >
                {wishlisted ? "♥ WISHLISTED" : "♡ WISHLIST"}
              </button>
            </div>
          </div>

          <div className="features-bar">
            <div className="feature">
              <span>🚚</span> Free Shipping
            </div>
            <div className="feature">
              <span>↩️</span> 30-Day Returns
            </div>
            <div className="feature">
              <span>🔒</span> Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ProductReviews reviews={reviews} productRating={product.rating} totalReviews={product.reviewCount} />

      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h3 className="related-title">YOU MIGHT ALSO LIKE</h3>
          <div className="related-grid">
            {relatedProducts.slice(0, 4).map((rp) => (
              <Link key={rp.id} href={`/products/${rp.id}`} className="related-item">
                <div className="related-img-wrap">
                  <Image
                    src={rp.image}
                    alt={rp.name}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="related-name">{rp.name}</span>
                <span className="related-price">${rp.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;

  .breadcrumb {
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .breadcrumb a { color: #666; transition: color 0.2s; }
  .breadcrumb a:hover { color: #ff3e00; }
  .breadcrumb .current { color: #1a1a1a; font-weight: 700; }
  .separator { color: #ccc; }

  .detail-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .main-image {
    position: relative;
    border: 3px solid #1a1a1a;
    box-shadow: 8px 8px 0 #1a1a1a;
    min-height: 450px;
    overflow: hidden;
    background: #f5f5f0;
  }

  .image-tag {
    position: absolute;
    top: 1rem;
    left: 0;
    background: #ff3e00;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    padding: 0.4rem 1.2rem 0.4rem 0.8rem;
    border: 2px solid #1a1a1a;
    border-left: none;
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    z-index: 2;
  }

  .thumbnail-strip {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;
  }

  .thumb {
    position: relative;
    width: 72px;
    height: 72px;
    border: 3px solid #ddd;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s;
    padding: 0;
    background: #f5f5f0;
  }

  .thumb.active {
    border-color: #1a1a1a;
    box-shadow: 3px 3px 0 #1a1a1a;
  }

  .thumb:hover {
    border-color: #1a1a1a;
  }

  .category-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
    background: #4d61ff;
    padding: 0.3rem 0.8rem;
    border: 2px solid #1a1a1a;
    box-shadow: 3px 3px 0 #1a1a1a;
    margin-bottom: 0.8rem;
    transform: rotate(-1deg);
  }

  .product-title {
    font-size: 2rem;
    font-weight: 900;
    color: #1a1a1a;
    margin: 0 0 1rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .rating-section {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .review-text {
    font-size: 0.85rem;
    color: #888;
    font-weight: 600;
  }

  .price-section {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.2rem;
    border-bottom: 2px dashed #ddd;
  }

  .price { font-size: 2.2rem; font-weight: 900; color: #1a1a1a; }
  .original-price { font-size: 1.1rem; color: #999; text-decoration: line-through; font-weight: 600; }

  .discount-tag {
    font-size: 0.7rem; font-weight: 900; letter-spacing: 0.1em;
    background: #ffef00; color: #1a1a1a; padding: 0.2rem 0.6rem;
    border: 2px solid #1a1a1a; transform: rotate(2deg); display: inline-block;
  }

  .description {
    font-size: 0.95rem; line-height: 1.7; color: #444;
    margin-bottom: 1.5rem; font-weight: 500;
  }

  .option-label {
    font-size: 0.75rem; font-weight: 900; letter-spacing: 0.15em;
    color: #1a1a1a; margin: 0 0 0.6rem;
  }

  .color-section { margin-bottom: 1.5rem; }
  .color-options { display: flex; gap: 0.6rem; }

  .color-swatch {
    width: 32px; height: 32px; border: 3px solid #ddd;
    cursor: pointer; transition: all 0.2s ease;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  }
  .color-swatch.active {
    border-color: #1a1a1a; transform: scale(1.15) rotate(-3deg);
    box-shadow: 3px 3px 0 #1a1a1a;
  }
  .color-swatch:hover { transform: scale(1.1); }

  .quantity-section { margin-bottom: 1.5rem; }

  .quantity-control {
    display: inline-flex; align-items: center;
    border: 3px solid #1a1a1a; box-shadow: 4px 4px 0 #1a1a1a;
  }

  .qty-btn {
    background: #fdfcf0; border: none; padding: 0.5rem 1rem;
    font-size: 1.2rem; font-weight: 900; cursor: pointer;
    transition: background 0.2s;
  }
  .qty-btn:hover { background: #1a1a1a; color: #fdfcf0; }

  .qty-value {
    padding: 0.5rem 1.2rem; font-size: 1.1rem; font-weight: 900;
    border-left: 3px solid #1a1a1a; border-right: 3px solid #1a1a1a;
    min-width: 50px; text-align: center;
  }

  .action-section { margin-bottom: 1.5rem; }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .wishlist-action {
    background: none;
    border: 3px solid #1a1a1a;
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 3px 3px 0 #1a1a1a;
  }

  .wishlist-action:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #1a1a1a;
  }

  .wishlist-action.active {
    background: #ff3d3d;
    color: #fff;
    border-color: #ff3d3d;
  }

  .features-bar {
    display: flex; gap: 1.5rem; flex-wrap: wrap;
  }
  .feature {
    font-size: 0.8rem; font-weight: 700; color: #666;
    display: flex; align-items: center; gap: 0.4rem;
  }

  .related-section {
    margin-top: 3rem; padding-top: 2rem;
    border-top: 3px solid #1a1a1a;
  }

  .related-title {
    font-size: 1.2rem; font-weight: 900;
    letter-spacing: 0.08em; margin: 0 0 1.5rem; color: #1a1a1a;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .related-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #1a1a1a;
    box-shadow: 3px 3px 0 #1a1a1a;
    transition: all 0.2s ease;
    text-align: center;
    gap: 0.5rem;
    background: #fff;
    overflow: hidden;
  }

  .related-item:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #1a1a1a;
  }

  .related-img-wrap {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }

  .related-name {
    font-size: 0.85rem; font-weight: 700; color: #1a1a1a;
    padding: 0 0.8rem;
  }

  .related-price {
    font-size: 0.9rem; font-weight: 900; color: #ff3e00;
    padding-bottom: 0.8rem;
  }

  @media (max-width: 768px) {
    .detail-layout { grid-template-columns: 1fr; gap: 2rem; }
    .main-image { min-height: 300px; }
    .product-title { font-size: 1.5rem; }
    .price { font-size: 1.8rem; }
  }
`;

export default ProductDetail;
