"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import ProductGrid from "@/components/products/product-grid";
import Button from "@/components/ui/button";
import { products } from "@/lib/data/products";

const featuredProducts = products.filter((p) => p.tag).slice(0, 8);
const trendingProducts = products.filter((p) => p.rating >= 4).slice(0, 4);

export default function Home() {
  return (
    <StyledWrapper>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">NEW COLLECTION 2026</div>
            <h1 className="hero-title">
              BRUTALLY
              <br />
              <span className="hero-accent">BEAUTIFUL</span>
              <br />
              DESIGN
            </h1>
            <p className="hero-desc">
              Premium products crafted with raw aesthetics and bold design
              philosophy. No compromises. No pretense.
            </p>
            <div className="hero-actions">
              <Link href="/products">
                <Button variant="primary" size="lg" as="div">
                  SHOP NOW →
                </Button>
              </Link>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">500+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-value">50K+</span>
                  <span className="stat-label">Customers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <span className="card-emoji">🎧</span>
              <span className="card-price">$249</span>
            </div>
            <div className="hero-card hero-card-2">
              <span className="card-emoji">👟</span>
              <span className="card-price">$89</span>
            </div>
            <div className="hero-card hero-card-3">
              <span className="card-emoji">⌚</span>
              <span className="card-price">$159</span>
            </div>
          </div>
        </div>
        <div className="hero-marquee">
          <div className="marquee-track">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="marquee-text">
                FREE SHIPPING ON ORDERS $99+ ★ 30-DAY RETURNS ★ SECURE CHECKOUT ★ BRUTALIST QUALITY ★{" "}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-inner">
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <div className="categories-grid">
            {[
              { name: "Electronics", emoji: "⚡", count: 5 },
              { name: "Clothing", emoji: "👔", count: 4 },
              { name: "Accessories", emoji: "💎", count: 4 },
              { name: "Footwear", emoji: "👢", count: 3 },
              { name: "Home & Living", emoji: "🏠", count: 4 },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-inner">
          <ProductGrid products={featuredProducts} title="FEATURED PRODUCTS" />
          <div className="view-all">
            <Link href="/products">
              <Button variant="secondary" as="div">VIEW ALL PRODUCTS →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="banner-section">
        <div className="banner-inner">
          <div className="banner-content">
            <h2 className="banner-title">DESIGN THAT HITS DIFFERENT</h2>
            <p className="banner-desc">
              Every product is selected for bold design and uncompromising quality.
              We don&apos;t do boring.
            </p>
            <Link href="/products">
              <Button variant="accent" size="md" as="div">
                EXPLORE
              </Button>
            </Link>
          </div>
          <div className="banner-emojis">
            <span>🔥</span>
            <span>💀</span>
            <span>⚡</span>
            <span>🖤</span>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="products-section">
        <div className="section-inner">
          <ProductGrid products={trendingProducts} title="TRENDING NOW" />
        </div>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Hero */
  .hero {
    background: #1a1a1a;
    color: #fdfcf0;
    overflow: hidden;
  }

  .hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 1.5rem 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .hero-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.2em;
    background: #ff3e00;
    color: #fff;
    padding: 0.4rem 1rem;
    border: 2px solid #fdfcf0;
    box-shadow: 3px 3px 0 #fdfcf0;
    transform: rotate(-2deg);
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 900;
    line-height: 0.95;
    margin: 0 0 1.5rem;
    letter-spacing: -0.03em;
  }

  .hero-accent {
    color: #ff3e00;
    -webkit-text-stroke: 2px #ff3e00;
  }

  .hero-desc {
    font-size: 1rem;
    line-height: 1.6;
    color: #999;
    max-width: 440px;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .hero-stats {
    display: flex;
    gap: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 900;
    color: #fdfcf0;
  }

  .stat-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #666;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Hero visual */
  .hero-visual {
    position: relative;
    height: 400px;
  }

  .hero-card {
    position: absolute;
    background: #fdfcf0;
    border: 3px solid #1a1a1a;
    box-shadow: 6px 6px 0 rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: transform 0.3s ease;
  }

  .hero-card:hover {
    transform: scale(1.05) rotate(0deg) !important;
    z-index: 10;
  }

  .hero-card-1 {
    width: 180px;
    height: 200px;
    top: 10%;
    left: 15%;
    transform: rotate(-5deg);
    z-index: 3;
    background: #fff;
  }

  .hero-card-2 {
    width: 160px;
    height: 180px;
    top: 5%;
    right: 10%;
    transform: rotate(4deg);
    z-index: 2;
    background: #ffef00;
  }

  .hero-card-3 {
    width: 150px;
    height: 170px;
    bottom: 5%;
    left: 35%;
    transform: rotate(-3deg);
    z-index: 1;
    background: #00e0b0;
  }

  .card-emoji {
    font-size: 3.5rem;
  }

  .card-price {
    font-size: 1.2rem;
    font-weight: 900;
    color: #1a1a1a;
    background: #fdfcf0;
    padding: 0.2rem 0.6rem;
    border: 2px solid #1a1a1a;
  }

  /* Marquee */
  .hero-marquee {
    background: #ff3e00;
    border-top: 3px solid #fdfcf0;
    overflow: hidden;
    padding: 0.6rem 0;
  }

  .marquee-track {
    display: flex;
    animation: scroll-marquee 20s linear infinite;
    white-space: nowrap;
  }

  @keyframes scroll-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.33%); }
  }

  .marquee-text {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #fdfcf0;
    flex-shrink: 0;
  }

  /* Sections */
  .section-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section-title {
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    margin: 0 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1a1a1a;
  }

  /* Categories */
  .categories-section {
    padding: 3rem 0;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  .category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    border: 3px solid #1a1a1a;
    box-shadow: 5px 5px 0 #1a1a1a;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
    color: inherit;
    background: #fff;
    gap: 0.5rem;
  }

  .category-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #1a1a1a;
    background: #ffef00;
  }

  .cat-emoji {
    font-size: 2.5rem;
    transition: transform 0.3s ease;
  }

  .category-card:hover .cat-emoji {
    transform: scale(1.2) rotate(-5deg);
  }

  .cat-name {
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1a1a1a;
  }

  .cat-count {
    font-size: 0.7rem;
    font-weight: 600;
    color: #888;
  }

  /* Products */
  .products-section {
    padding: 2rem 0 3rem;
  }

  .view-all {
    text-align: center;
    margin-top: 2rem;
  }

  /* Banner */
  .banner-section {
    background: #4d61ff;
    border-top: 3px solid #1a1a1a;
    border-bottom: 3px solid #1a1a1a;
  }

  .banner-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .banner-title {
    font-size: 2rem;
    font-weight: 900;
    color: #fdfcf0;
    margin: 0 0 0.8rem;
    letter-spacing: 0.02em;
  }

  .banner-desc {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    max-width: 480px;
    font-weight: 500;
    line-height: 1.6;
  }

  .banner-emojis {
    display: flex;
    gap: 1rem;
    font-size: 3rem;
  }

  .banner-emojis span {
    animation: float 3s ease-in-out infinite;
  }

  .banner-emojis span:nth-child(2) { animation-delay: 0.5s; }
  .banner-emojis span:nth-child(3) { animation-delay: 1s; }
  .banner-emojis span:nth-child(4) { animation-delay: 1.5s; }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }

  @media (max-width: 1024px) {
    .hero-inner {
      grid-template-columns: 1fr;
    }
    .hero-visual {
      display: none;
    }
    .hero-title {
      font-size: 3rem;
    }
    .categories-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 2.2rem;
    }
    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .banner-inner {
      flex-direction: column;
      text-align: center;
    }
    .banner-title {
      font-size: 1.4rem;
    }
  }
`;
