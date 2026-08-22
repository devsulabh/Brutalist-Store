"use client";

import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent";
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const Button = ({
  children = "POW!",
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  size = "md",
  as: Component = "button",
}: ButtonProps) => {
  const variantColors: Record<string, { primary: string; secondary: string; accent: string }> = {
    primary: { primary: "#ff3e00", secondary: "#4d61ff", accent: "#ffef00" },
    secondary: { primary: "#4d61ff", secondary: "#ff3e00", accent: "#00e0b0" },
    accent: { primary: "#00e0b0", secondary: "#ff3e00", accent: "#ffef00" },
  };

  const sizes: Record<string, string> = {
    sm: "0.9em",
    md: "1.2em",
    lg: "1.5em",
  };

  return (
    <StyledWrapper
      $primaryColor={variantColors[variant].primary}
      $secondaryColor={variantColors[variant].secondary}
      $accentColor={variantColors[variant].accent}
      $fontSize={sizes[size]}
      className={className}
    >
      <Component
        className="comic-brutal-button"
        onClick={onClick}
        {...(Component === "button" ? { type, disabled } : { role: "button", tabIndex: 0 })}
      >
        <div className="button-inner">
          <span className="button-text">{children}</span>
          <div className="halftone-overlay" />
          <div className="ink-splatter" />
        </div>
        <div className="button-shadow" />
        <div className="button-frame" />
      </Component>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{
  $primaryColor: string;
  $secondaryColor: string;
  $accentColor: string;
  $fontSize: string;
}>`
  display: inline-block;

  .comic-brutal-button {
    position: relative;
    font-size: ${(p) => p.$fontSize};
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    transform: rotate(-2deg);
    transform-origin: center;
    transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .comic-brutal-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .button-inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.$primaryColor};
    color: #000;
    padding: 0.6em 1.2em;
    z-index: 3;
    overflow: hidden;
    transform: skew(-3deg, 1deg);
    transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
    clip-path: polygon(
      0% 10%, 3% 0%, 97% 0%, 100% 10%,
      100% 90%, 97% 100%, 3% 100%, 0% 90%
    );
  }

  .button-text {
    position: relative;
    font-weight: 900;
    font-size: 1em;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    z-index: 5;
    color: #000;
    text-shadow:
      0.05em 0.05em 0 #fff,
      -0.05em -0.05em 0 #fff,
      0.05em -0.05em 0 #fff,
      -0.05em 0.05em 0 #fff;
    transform: rotate(2deg);
    white-space: nowrap;
  }

  .button-frame {
    position: absolute;
    top: -0.25em;
    left: -0.25em;
    right: -0.25em;
    bottom: -0.25em;
    background-color: ${(p) => p.$accentColor};
    border: 0.12em solid #000;
    z-index: 1;
    transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .button-shadow {
    position: absolute;
    top: 0.35em;
    left: 0.35em;
    right: -0.35em;
    bottom: -0.35em;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 0;
    transition: all 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .halftone-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at 30% 30%,
      rgba(0, 0, 0, 0.2) 0.1em,
      transparent 0.1em
    );
    background-size: 0.5em 0.5em;
    opacity: 0.3;
    z-index: 2;
    mix-blend-mode: multiply;
  }

  .ink-splatter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease;
    background: radial-gradient(
        circle at 20% 30%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 20%, transparent 50%
      ),
      radial-gradient(
        circle at 70% 65%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 25%, transparent 50%
      );
  }

  .comic-brutal-button:not(:disabled):hover {
    transform: rotate(-1deg) scale(1.05);
  }

  .comic-brutal-button:not(:disabled):hover .button-inner {
    transform: skew(-5deg, 2deg);
    background-color: ${(p) => p.$secondaryColor};
  }

  .comic-brutal-button:not(:disabled):hover .button-text {
    color: #fff;
    text-shadow:
      0.05em 0.05em 0 #000,
      -0.05em -0.05em 0 #000,
      0.05em -0.05em 0 #000,
      -0.05em 0.05em 0 #000;
  }

  .comic-brutal-button:not(:disabled):hover .button-shadow {
    transform: translate(0.15em, 0.15em);
  }

  .comic-brutal-button:not(:disabled):hover .ink-splatter {
    opacity: 1;
  }

  .comic-brutal-button:focus {
    outline: none;
  }

  .comic-brutal-button:not(:disabled):active {
    transform: rotate(0) scale(0.98);
  }

  .comic-brutal-button:not(:disabled):active .button-inner {
    transform: skew(0, 0);
  }

  .comic-brutal-button:not(:disabled):active .button-shadow {
    transform: translate(0.08em, 0.08em);
  }

  @keyframes burst {
    0% { transform: scale(0.95); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .comic-brutal-button:active .button-text {
    animation: burst 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

export default Button;
