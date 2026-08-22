"use client";

import React, { useState } from "react";
import styled from "styled-components";
import type { Review } from "@/lib/data/products";
import Rating from "./rating";
import Button from "@/components/ui/button";

interface ProductReviewsProps {
  reviews: Review[];
  productRating: number;
  totalReviews: number;
}

const ProductReviews = ({ reviews, productRating, totalReviews }: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <StyledWrapper>
      <div className="reviews-section">
        <div className="reviews-header">
          <div className="summary">
            <h2 className="title">CUSTOMER REVIEWS</h2>
            <div className="rating-overview">
              <Rating value={productRating} readOnly size={28} name="overview-rating" />
              <span className="overview-text">
                {productRating.toFixed(1)} out of 5 ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "CANCEL" : "WRITE A REVIEW"}
          </Button>
        </div>

        {showForm && (
          <div className="review-form">
            <h3 className="form-title">WRITE YOUR REVIEW</h3>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div className="form-group">
                <label>RATING</label>
                <Rating value={5} name="new-review-rating" size={24} />
              </div>
              <div className="form-group">
                <label>TITLE</label>
                <input type="text" className="brutal-input" placeholder="Summarize your thoughts" required />
              </div>
              <div className="form-group">
                <label>REVIEW</label>
                <textarea className="brutal-textarea" rows={4} placeholder="Tell us what you think..." required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>NAME</label>
                  <input type="text" className="brutal-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input type="email" className="brutal-input" placeholder="Your email (won't be published)" required />
                </div>
              </div>
              <Button type="submit" variant="primary">SUBMIT REVIEW →</Button>
            </form>
          </div>
        )}

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-meta">
                <div className="avatar">{review.avatar}</div>
                <div className="meta-info">
                  <span className="author-name">{review.author}</span>
                  <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="review-content">
                <div className="review-rating">
                  <Rating value={review.rating} readOnly size={14} name={`review-${review.id}`} />
                </div>
                <h4 className="review-title">{review.title}</h4>
                <p className="review-text">{review.text}</p>
              </div>
              
              <div className="review-footer">
                <span className="helpful-text">{review.helpful} people found this helpful</span>
                <button className="helpful-btn">HELPFUL 👍</button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="no-reviews">
              <span className="no-reviews-icon">📝</span>
              <p>No reviews yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .reviews-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 4px solid #1a1a1a;
  }

  .reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .title {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    margin: 0 0 0.8rem;
    color: #1a1a1a;
  }

  .rating-overview {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .overview-text {
    font-size: 0.9rem;
    font-weight: 700;
    color: #666;
  }

  .review-form {
    background: #fff;
    border: 3px solid #1a1a1a;
    box-shadow: 6px 6px 0 #1a1a1a;
    padding: 2rem;
    margin-bottom: 3rem;
    animation: form-slide-down 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  @keyframes form-slide-down {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .form-title {
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    margin: 0 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1a1a1a;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  .brutal-input, .brutal-textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 3px solid #1a1a1a;
    background: #fdfcf0;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1a1a1a;
    transition: all 0.2s;
  }

  .brutal-input:focus, .brutal-textarea:focus {
    outline: none;
    box-shadow: 4px 4px 0 #1a1a1a;
    transform: translate(-2px, -2px);
    background: #fff;
  }

  .brutal-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .reviews-list {
    display: grid;
    gap: 2rem;
  }

  .review-card {
    background: #fff;
    border: 2px solid #1a1a1a;
    padding: 1.5rem;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .review-card:hover {
    box-shadow: 6px 6px 0 #1a1a1a;
    transform: translate(-2px, -2px);
  }

  .review-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px dashed #eee;
  }

  .avatar {
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    color: #fff;
    font-weight: 900;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1a1a1a;
    transform: rotate(-5deg);
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .author-name {
    font-weight: 900;
    font-size: 0.95rem;
    color: #1a1a1a;
  }

  .review-date {
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
  }

  .review-rating {
    margin-bottom: 0.5rem;
  }

  .review-title {
    font-size: 1.1rem;
    font-weight: 800;
    margin: 0 0 0.8rem;
    color: #1a1a1a;
  }

  .review-text {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #444;
    font-weight: 500;
    margin: 0 0 1.5rem;
  }

  .review-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fdfcf0;
    padding: 0.8rem 1rem;
    border: 2px solid #1a1a1a;
    margin-top: 1rem;
  }

  .helpful-text {
    font-size: 0.75rem;
    font-weight: 700;
    color: #666;
  }

  .helpful-btn {
    background: none;
    border: 2px solid #1a1a1a;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 900;
    cursor: pointer;
    transition: all 0.2s;
  }

  .helpful-btn:hover {
    background: #1a1a1a;
    color: #fff;
  }

  .no-reviews {
    text-align: center;
    padding: 3rem;
    border: 3px dashed #ddd;
    font-weight: 700;
    color: #888;
  }

  .no-reviews-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    .form-row { grid-template-columns: 1fr; gap: 0; }
  }
`;

export default ProductReviews;
