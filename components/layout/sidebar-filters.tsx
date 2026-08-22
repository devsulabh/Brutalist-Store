"use client";

import React from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import Checkbox from "@/components/ui/checkbox";
import { categories } from "@/lib/data/products";

const SidebarFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentMinRating = searchParams.get("minRating") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push("/products", { scroll: false });
  };

  return (
    <StyledWrapper>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title">FILTERS</h3>
          <button className="clear-all" onClick={clearAll}>
            CLEAR ALL
          </button>
        </div>

        <div className="filter-section">
          <h4 className="section-title">CATEGORIES</h4>
          <div className="filter-options">
            <div
              className={`category-option ${!currentCategory ? "active" : ""}`}
              onClick={() => updateParams("category", "")}
            >
              All Products
            </div>
            {categories.map((cat) => (
              <div key={cat} className="checkbox-row">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={currentCategory === cat}
                  onChange={(checked) =>
                    updateParams("category", checked ? cat : "")
                  }
                  label={cat}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="section-title">SORT BY</h4>
          <div className="sort-options">
            {[
              { value: "", label: "Default" },
              { value: "price-asc", label: "Price: Low → High" },
              { value: "price-desc", label: "Price: High → Low" },
              { value: "rating", label: "Top Rated" },
              { value: "name", label: "A → Z" },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`sort-btn ${currentSort === opt.value ? "active" : ""}`}
                onClick={() => updateParams("sort", opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="section-title">MIN RATING</h4>
          <div className="rating-options">
            {[0, 3, 4, 5].map((r) => (
              <button
                key={r}
                className={`rating-btn ${currentMinRating === String(r) || (!currentMinRating && r === 0) ? "active" : ""}`}
                onClick={() => updateParams("minRating", r === 0 ? "" : String(r))}
              >
                {r === 0 ? "ALL" : `${r}★+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .sidebar {
    background: #fff;
    border: 3px solid #1a1a1a;
    box-shadow: 5px 5px 0 #1a1a1a;
    padding: 1.2rem;
    position: sticky;
    top: 80px;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1a1a1a;
  }

  .sidebar-title {
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    margin: 0;
  }

  .clear-all {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    background: none;
    border: 2px solid #ff3e00;
    color: #ff3e00;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .clear-all:hover {
    background: #ff3e00;
    color: #fff;
  }

  .filter-section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #888;
    margin: 0 0 0.8rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #eee;
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .category-option {
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
  }

  .category-option.active {
    color: #ff3e00;
    background: #fff5f0;
    border-left: 3px solid #ff3e00;
  }

  .category-option:hover {
    color: #1a1a1a;
  }

  .checkbox-row {
    padding: 0.2rem 0;
  }

  .sort-options {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .sort-btn {
    text-align: left;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.5rem 0.7rem;
    background: none;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
  }

  .sort-btn:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }

  .sort-btn.active {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: #fdfcf0;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
  }

  .rating-options {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .rating-btn {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.4rem 0.7rem;
    background: none;
    border: 2px solid #ddd;
    cursor: pointer;
    transition: all 0.2s;
    color: #888;
  }

  .rating-btn:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }

  .rating-btn.active {
    border-color: #ff3e00;
    background: #ff3e00;
    color: #fff;
    box-shadow: 2px 2px 0 #1a1a1a;
  }
`;

export default SidebarFilters;
