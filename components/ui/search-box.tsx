"use client";

import React from "react";
import styled from "styled-components";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  label?: string;
  className?: string;
}

const SearchBox = ({
  placeholder = "Search products...",
  value,
  onChange,
  onSubmit,
  label = "SEARCH",
  className = "",
}: SearchBoxProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit((e.target as HTMLInputElement).value);
    }
  };

  return (
    <StyledWrapper className={className}>
      <div className="brutalist-container">
        <input
          placeholder={placeholder}
          className="brutalist-input smooth-type"
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <label className="brutalist-label">{label}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-container {
    position: relative;
    width: 100%;
    max-width: 320px;
    font-family: monospace;
  }

  .brutalist-input {
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    border: 3px solid #000;
    position: relative;
    overflow: hidden;
    border-radius: 0;
    outline: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 4px 4px 0 #000, 8px 8px 0 #4a90e2;
  }

  .brutalist-input:focus {
    animation: focus-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  .brutalist-label {
    position: absolute;
    left: -3px;
    top: -28px;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    padding: 4px 8px;
    transform: rotate(-1deg);
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    letter-spacing: 0.1em;
  }

  .brutalist-input:focus + .brutalist-label {
    transform: rotate(0deg) scale(1.05);
    background-color: #4a90e2;
  }

  .brutalist-input::placeholder {
    color: #888;
    transition: color 0.3s ease;
  }

  .brutalist-input:focus::placeholder {
    color: transparent;
  }

  @keyframes focus-pulse {
    0%, 100% { border-color: #000; }
    50% { border-color: #4a90e2; }
  }
`;

export default SearchBox;
