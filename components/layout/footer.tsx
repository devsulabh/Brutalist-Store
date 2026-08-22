import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Footer = () => {
  return (
    <StyledWrapper>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <span className="logo-icon">⚡</span>
                <span className="logo-text">BRUTALIST</span>
              </div>
              <p className="brand-desc">
                Bold design. Raw aesthetics. Premium products that make a statement.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="col-title">SHOP</h4>
              <ul className="col-links">
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/products?category=Electronics">Electronics</Link></li>
                <li><Link href="/products?category=Clothing">Clothing</Link></li>
                <li><Link href="/products?category=Accessories">Accessories</Link></li>
                <li><Link href="/products?category=Footwear">Footwear</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="col-title">COMPANY</h4>
              <ul className="col-links">
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="col-title">NEWSLETTER</h4>
              <p className="newsletter-desc">Get brutally honest updates.</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">→</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© 2026 BRUTALIST STORE. NO RIGHTS RESERVED.</p>
            <div className="footer-badges">
              <span className="badge">FREE SHIPPING</span>
              <span className="badge">24/7 SUPPORT</span>
              <span className="badge">SECURE PAY</span>
            </div>
          </div>
        </div>
      </footer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .footer {
    background: #1a1a1a;
    color: #fdfcf0;
    border-top: 4px solid #ff3e00;
    margin-top: auto;
  }

  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 1.5rem 1.5rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.8rem;
  }

  .footer-logo .logo-icon {
    font-size: 1.6rem;
  }

  .footer-logo .logo-text {
    font-weight: 900;
    font-size: 1.3rem;
    letter-spacing: 0.08em;
  }

  .brand-desc {
    font-size: 0.85rem;
    color: #999;
    line-height: 1.5;
    max-width: 250px;
  }

  .col-title {
    font-weight: 900;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #333;
    color: #ff3e00;
  }

  .col-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .col-links a {
    font-size: 0.85rem;
    color: #999;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-block;
  }

  .col-links a:hover {
    color: #fdfcf0;
    transform: translateX(4px);
  }

  .newsletter-desc {
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 0.8rem;
  }

  .newsletter-form {
    display: flex;
    border: 2px solid #444;
  }

  .newsletter-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: monospace;
    letter-spacing: 0.08em;
    background: #2a2a2a;
    border: none;
    outline: none;
    color: #fdfcf0;
  }

  .newsletter-input::placeholder {
    color: #666;
  }

  .newsletter-btn {
    padding: 0.6rem 1rem;
    background: #ff3e00;
    border: none;
    color: #fdfcf0;
    font-weight: 900;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .newsletter-btn:hover {
    background: #ff6d43;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid #333;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .copyright {
    font-size: 0.75rem;
    color: #666;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .footer-badges {
    display: flex;
    gap: 0.5rem;
  }

  .badge {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    padding: 0.3rem 0.6rem;
    border: 1px solid #444;
    color: #999;
  }

  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Footer;
