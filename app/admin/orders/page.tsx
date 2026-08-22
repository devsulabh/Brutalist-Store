import React from "react";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });

  return (
    <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#1a1a1a]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-widest">CUSTOMER ORDERS</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr className="bg-black text-white text-left font-black tracking-wider uppercase">
              <th className="p-3 border-r-2 border-white">Order ID</th>
              <th className="p-3 border-r-2 border-white">Customer</th>
              <th className="p-3 border-r-2 border-white">Status</th>
              <th className="p-3 border-r-2 border-white">Total</th>
              <th className="p-3 border-r-2 border-white">Date</th>
              <th className="p-3">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center font-bold">No orders found.</td>
              </tr>
            ) : orders.map((o) => (
              <tr key={o.id} className="border-b-2 border-black font-semibold hover:bg-gray-100">
                <td className="p-3 border-r-2 border-black">{o.id.slice(0, 8)}...</td>
                <td className="p-3 border-r-2 border-black">
                  {o.user.name || o.user.email}
                  <div className="text-xs text-gray-500 font-normal">{o.user.email}</div>
                </td>
                <td className="p-3 border-r-2 border-black">
                  <span className={`px-2 py-1 text-xs font-black uppercase ${o.status === "PENDING" ? "bg-yellow-300" : o.status === "PAID" ? "bg-green-400" : "bg-gray-300"}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3 border-r-2 border-black">${o.totalAmount.toFixed(2)}</td>
                <td className="p-3 border-r-2 border-black text-sm">{o.createdAt.toLocaleDateString()}</td>
                <td className="p-3 text-sm">
                  <ul className="list-disc list-inside">
                    {o.items.map(item => (
                      <li key={item.id}>{item.quantity}x {item.product.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
