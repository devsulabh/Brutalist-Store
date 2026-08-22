import "dotenv/config";
import { prisma } from "../lib/prisma";
import { products } from "../lib/data/products";

async function main() {
  console.log("Seeding database...");
  console.log("DB URL:", process.env.DATABASE_URL);

  // Create an Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@brutalist.com" },
    update: {},
    create: {
      email: "admin@brutalist.com",
      name: "Admin User",
      // Simple hash for "password123" (since bcrypt might not be installed yet in the script)
      // In production, we will hash this properly when we add next-auth
      passwordHash: "password123", 
      role: "ADMIN",
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create Products
  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { id: product.id },
    });

    if (!existing) {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          images: JSON.stringify(product.images),
          category: product.category,
          tag: product.tag,
          rating: product.rating,
          reviewCount: product.reviewCount,
          stock: 100, // Default stock
          colors: product.colors ? JSON.stringify(product.colors) : null,
        },
      });
      console.log(`Created product: ${product.name}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
