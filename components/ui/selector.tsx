"use client";

import React from "react";
import styled from "styled-components";

interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  options: SelectorOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Selector = ({
  options,
  name,
  value,
  onChange,
  className = "",
}: SelectorProps) => {
  return (
    <StyledWrapper $totalOptions={options.length} className={className}>
      <div className="radio-container">
        {options.map((opt, i) => (
          <React.Fragment key={opt.value}>
            <input
              id={`${name}-${opt.value}`}
              name={name}
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              defaultChecked={!value && i === 0}
            />
            <label htmlFor={`${name}-${opt.value}`}>{opt.label}</label>
          </React.Fragment>
        ))}
        <div className="glider-container">
          <div className="glider" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $totalOptions: number }>`
  .radio-container {
    --main-color: #ff3e00;
    --main-color-opacity: #ff3e001c;
    --total-radio: ${(p) => p.$totalOptions};

    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 0.5rem;
  }

  .radio-container input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .radio-container .glider-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(27, 27, 27, 1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    width: 1px;
  }

  .radio-container .glider-container .glider {
    position: relative;
    height: calc(100% / var(--total-radio));
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      var(--main-color) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
  }

  .radio-container .glider-container .glider::before {
    content: "";
    position: absolute;
    height: 60%;
    width: 300%;
    top: 50%;
    transform: translateY(-50%);
    background: var(--main-color);
    filter: blur(10px);
  }

  .radio-container .glider-container .glider::after {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      90deg,
      var(--main-color-opacity) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .radio-container label {
    cursor: pointer;
    padding: 0.8rem 1rem;
    position: relative;
    color: #666;
    font-weight: 600;
    font-size: 0.9em;
    transition: all 0.3s ease-in-out;
  }

  .radio-container input:checked + label {
    color: var(--main-color);
  }

  ${({ $totalOptions }) =>
    Array.from({ length: $totalOptions }, (_, i) => `
      .radio-container input:nth-of-type(${i + 1}):checked ~ .glider-container .glider {
        transform: translateY(${i * 100}%);
      }
    `).join("")}
`;

export default Selector;
