import React from "react";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#1a1a1a]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-widest">MANAGE PRODUCTS</h1>
        <button className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#1a1a1a] transition-all">
          + ADD PRODUCT
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr className="bg-black text-white text-left font-black tracking-wider uppercase">
              <th className="p-3 border-r-2 border-white">ID</th>
              <th className="p-3 border-r-2 border-white">Name</th>
              <th className="p-3 border-r-2 border-white">Price</th>
              <th className="p-3 border-r-2 border-white">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b-2 border-black font-semibold hover:bg-gray-100">
                <td className="p-3 border-r-2 border-black">{p.id.slice(0, 8)}...</td>
                <td className="p-3 border-r-2 border-black">{p.name}</td>
                <td className="p-3 border-r-2 border-black">${p.price.toFixed(2)}</td>
                <td className="p-3 border-r-2 border-black">{p.stock}</td>
                <td className="p-3 flex gap-2">
                  <button className="px-3 py-1 bg-gray-200 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">EDIT</button>
                  <button className="px-3 py-1 bg-red-500 text-white border-2 border-black font-bold hover:bg-black transition-colors">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
