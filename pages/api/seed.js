import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

export default async function handler(req, res) {
  await connectDB();

  const items = [
    { 
      name: "Running Shoes", 
      price: 1200, 
      category: "Footwear", 
      description: "Comfortable and stylish running shoes for daily use.", 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" // 🔗 Full URL
    },
    { 
      name: "Leather Jacket", 
      price: 3500, 
      category: "Clothing", 
      description: "A timeless black leather jacket for a classic look.", 
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935"
    },
    { 
      name: "Bluetooth Headphones", 
      price: 2000, 
      category: "Electronics", 
      description: "Immerse yourself with these noise-cancelling headphones.", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070"
    },
    { 
      name: "Smart Watch", 
      price: 4500, 
      category: "Electronics", 
      description: "Track your fitness and stay connected on the go.", 
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964"
    },
    { 
      name: "Durable Backpack", 
      price: 900, 
      category: "Accessories", 
      description: "A spacious and waterproof backpack for all your adventures.", 
      image: "https://skybags.co.in/cdn/shop/files/Vesper_Resized_1080x.webp?v=1723540666"
    },
  ];

  await Item.deleteMany({});
  await Item.insertMany(items);

  res.json({ message: "Database seeded successfully with internet images!", count: items.length });
}