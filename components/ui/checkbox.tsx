"use client";

import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

const Checkbox = ({
  checked,
  onChange,
  label,
  id,
  className = "",
}: CheckboxProps) => {
  return (
    <StyledWrapper className={className}>
      <label className="container" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="checkmark" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  .container .checkmark {
    position: relative;
    flex-shrink: 0;
    height: 1.4em;
    width: 1.4em;
    background-color: #fdfcf0;
    border: 3px solid #1a1a1a;
    border-radius: 8% 92% 12% 88% / 87% 11% 89% 13%;
    box-shadow: 3px 3px 0px #1a1a1a;
    transition:
      transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.2s;
  }

  .container:hover .checkmark {
    transform: scale(1.05) rotate(2deg);
  }

  .container input:checked ~ .checkmark {
    background-color: #ff5722;
    border-radius: 92% 8% 88% 12% / 11% 87% 13% 89%;
    transform: scale(1.1) rotate(-2deg);
  }

  .container .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.32em;
    top: 0.06em;
    width: 0.28em;
    transform: translate(-50%, -50%) rotate(40deg);
    height: 0.65em;
    border: solid #1a1a1a;
    border-width: 0 0.22em 0.22em 0;
    border-radius: 2px;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
    animation: splash 0.3s forwards;
  }

  .checkbox-label {
    font-size: 0.75em;
    font-weight: 600;
    color: #1a1a1a;
    letter-spacing: 0.02em;
  }

  .container:active .checkmark {
    transform: scale(0.9) translateY(3px);
    box-shadow: 0px 0px 0px #1a1a1a;
  }

  @keyframes splash {
    0% { transform: scale(0) rotate(40deg); opacity: 0; }
    70% { transform: scale(1.2) rotate(40deg); }
    100% { transform: scale(1) rotate(40deg); opacity: 1; }
  }
`;

export default Checkbox;
