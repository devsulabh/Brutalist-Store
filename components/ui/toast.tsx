"use client";

import React from "react";
import styled from "styled-components";
import { useToast } from "@/lib/toast-context";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <StyledWrapper>
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "✕"}
              {toast.type === "info" && "ℹ"}
            </div>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              ✕
            </button>
            <div className="toast-progress" />
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 300;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    max-width: 380px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.8rem 1rem;
    border: 3px solid #1a1a1a;
    box-shadow: 5px 5px 0 #1a1a1a;
    animation: toast-slide-in 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
    font-size: 0.85rem;
    font-weight: 700;
  }

  @keyframes toast-slide-in {
    from {
      transform: translateX(120%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .toast-success {
    background: #fdfcf0;
    color: #1a1a1a;
  }

  .toast-error {
    background: #ff3d3d;
    color: #fff;
  }

  .toast-info {
    background: #4d61ff;
    color: #fff;
  }

  .toast-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 0.8rem;
    flex-shrink: 0;
    border: 2px solid currentColor;
  }

  .toast-success .toast-icon {
    background: #00c853;
    color: #fff;
    border-color: #1a1a1a;
  }

  .toast-message {
    flex: 1;
    letter-spacing: 0.02em;
  }

  .toast-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 0.75rem;
    font-weight: 900;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;
    padding: 0.2rem;
  }

  .toast-close:hover {
    opacity: 1;
  }

  .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: currentColor;
    opacity: 0.3;
    animation: toast-progress 3s linear forwards;
  }

  @keyframes toast-progress {
    from { width: 100%; }
    to { width: 0%; }
  }

  @media (max-width: 480px) {
    .toast-container {
      left: 1rem;
      right: 1rem;
      max-width: none;
    }
  }
`;

export default ToastContainer;
