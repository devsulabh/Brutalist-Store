import React, { Suspense } from "react";
import SidebarFilters from "@/components/layout/sidebar-filters";
import ProductGrid from "@/components/products/product-grid";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const minRating = params.minRating ? Number(params.minRating) : undefined;
  const search = params.search as string | undefined;
  const sort = params.sort as string | undefined;

  const where: Prisma.ProductWhereInput = {};

  if (category) {
    where.category = category;
  }
  if (minRating) {
    where.rating = { gte: minRating };
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "rating":
      orderBy = { rating: "desc" };
      break;
    case "name":
      orderBy = { name: "asc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  // Prisma returns stringified JSON for arrays, parse them back for the frontend
  const formattedProducts = products.map((p) => ({
    ...p,
    originalPrice: p.originalPrice ?? undefined,
    tag: p.tag ?? undefined,
    images: JSON.parse(p.images) as string[],
    colors: p.colors ? (JSON.parse(p.colors) as string[]) : undefined,
    inStock: p.stock > 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-widest text-[#1a1a1a] mb-1">
          {search ? `SEARCH: "${search}"` : "ALL PRODUCTS"}
        </h1>
        <p className="text-sm font-semibold text-gray-500">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        <aside className="sticky top-20">
          <SidebarFilters />
        </aside>
        <div>
          <Suspense fallback={<div className="p-12 text-center font-black tracking-widest">LOADING...</div>}>
            <ProductGrid products={formattedProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
