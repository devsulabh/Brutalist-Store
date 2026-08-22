import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="admin-layout flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#1a1a1a] text-white p-6 border-r-4 border-black">
        <h2 className="text-2xl font-black tracking-widest mb-8 border-b-2 border-gray-600 pb-4">
          ADMIN
        </h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin/products" className="font-bold hover:text-[#ff3e00] transition-colors">
            PRODUCTS
          </Link>
          <Link href="/admin/orders" className="font-bold hover:text-[#ff3e00] transition-colors">
            ORDERS
          </Link>
          <Link href="/" className="font-bold text-gray-400 hover:text-white transition-colors mt-auto pt-8">
            ← BACK TO STORE
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
