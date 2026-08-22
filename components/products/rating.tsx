"use client";

import React from "react";
import styled from "styled-components";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  name?: string;
  size?: number;
  className?: string;
}

const Rating = ({
  value = 0,
  onChange,
  readOnly = false,
  name = "rating",
  size = 24,
  className = "",
}: RatingProps) => {
  return (
    <StyledWrapper $readOnly={readOnly} $size={size} className={className}>
      <div className="rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              value={star}
              name={name}
              id={`${name}-star${star}`}
              type="radio"
              checked={value === star}
              onChange={() => !readOnly && onChange?.(star)}
              disabled={readOnly}
            />
            <label htmlFor={`${name}-star${star}`} />
          </React.Fragment>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $readOnly: boolean; $size: number }>`
  .rating {
    display: inline-flex;
    direction: rtl;
    gap: 2px;
  }

  .rating input {
    display: none;
  }

  .rating label {
    float: right;
    cursor: ${(p) => (p.$readOnly ? "default" : "pointer")};
    color: #ddd;
    transition: color 0.2s;
  }

  .rating label:before {
    content: "\\2605";
    font-size: ${(p) => p.$size}px;
  }

  .rating input:checked ~ label,
  ${(p) => !p.$readOnly && `
    .rating label:hover,
    .rating label:hover ~ label,
  `}
  .rating input:checked ~ label {
    color: #ff3e00;
  }
`;

export default Rating;
