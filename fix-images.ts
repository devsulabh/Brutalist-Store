import { config } from "dotenv";
config();
import { prisma } from "./lib/prisma";

async function fixImages() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    let updated = false;
    let newImage = p.image;
    let newImages = p.images;
    
    if (newImage.includes("1507473885765-e6ed057ab6fe")) {
      newImage = newImage.replace("1507473885765-e6ed057ab6fe", "1523275335684-37898b6baf30");
      updated = true;
    }
    if (newImage.includes("1515562141589-67f0d51e6e4f")) {
      newImage = newImage.replace("1515562141589-67f0d51e6e4f", "1542291026-7eec264c27ff");
      updated = true;
    }
    
    if (newImages.includes("1507473885765-e6ed057ab6fe")) {
      newImages = newImages.replace(/1507473885765-e6ed057ab6fe/g, "1523275335684-37898b6baf30");
      updated = true;
    }
    if (newImages.includes("1515562141589-67f0d51e6e4f")) {
      newImages = newImages.replace(/1515562141589-67f0d51e6e4f/g, "1542291026-7eec264c27ff");
      updated = true;
    }

    if (updated) {
      await prisma.product.update({
        where: { id: p.id },
        data: { image: newImage, images: newImages },
      });
      console.log(`Updated product ${p.id}`);
    }
  }
  console.log("Done");
}

fixImages().catch(console.error);
