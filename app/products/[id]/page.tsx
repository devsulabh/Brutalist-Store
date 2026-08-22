import React from "react";
import { prisma } from "@/lib/prisma";
import ProductDetail from "@/components/products/product-detail";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "4rem auto",
          textAlign: "center",
          padding: "3rem 1.5rem",
          border: "3px solid #1a1a1a",
          boxShadow: "6px 6px 0 #1a1a1a",
          background: "#fff",
        }}
      >
        <span style={{ fontSize: "4rem", display: "block", marginBottom: "1rem" }}>
          😵
        </span>
        <h2
          style={{
            fontWeight: 900,
            fontSize: "1.5rem",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          PRODUCT NOT FOUND
        </h2>
        <p style={{ color: "#888", marginBottom: "1.5rem" }}>
          This product doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            padding: "0.7rem 1.5rem",
            background: "#1a1a1a",
            color: "#fdfcf0",
            fontWeight: 900,
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            border: "2px solid #1a1a1a",
            textDecoration: "none",
          }}
        >
          ← BACK TO PRODUCTS
        </Link>
      </div>
    );
  }

  const related = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
  });

  const formattedProduct = {
    ...product,
    originalPrice: product.originalPrice ?? undefined,
    tag: product.tag ?? undefined,
    images: JSON.parse(product.images) as string[],
    colors: product.colors ? (JSON.parse(product.colors) as string[]) : undefined,
    inStock: product.stock > 0,
  };

  const formattedRelated = related.map((p) => ({
    ...p,
    originalPrice: p.originalPrice ?? undefined,
    tag: p.tag ?? undefined,
    images: JSON.parse(p.images) as string[],
    colors: p.colors ? (JSON.parse(p.colors) as string[]) : undefined,
    inStock: p.stock > 0,
  }));

  return <ProductDetail product={formattedProduct} relatedProducts={formattedRelated} />;
}
