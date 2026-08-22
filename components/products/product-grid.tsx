"use client";

import React from "react";
import styled from "styled-components";
import ProductCard from "./product-card";
import type { Product } from "@/lib/data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <StyledWrapper>
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3 className="empty-title">NO PRODUCTS FOUND</h3>
          <p className="empty-desc">Try adjusting your filters or search terms.</p>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      {title && (
        <div className="grid-header">
          <h2 className="grid-title">{title}</h2>
          <span className="product-count">{products.length} ITEMS</span>
        </div>
      )}
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .grid-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1a1a1a;
  }

  .grid-title {
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #1a1a1a;
    margin: 0;
  }

  .product-count {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: #ff3e00;
    background: #1a1a1a;
    padding: 0.3rem 0.7rem;
    transform: rotate(-1deg);
    display: inline-block;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    border: 3px dashed #ddd;
  }

  .empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin: 0 0 0.5rem;
    color: #1a1a1a;
  }

  .empty-desc {
    font-size: 0.9rem;
    color: #888;
    margin: 0;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
  }
`;

export default ProductGrid;
