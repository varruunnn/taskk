import ProductBrowser from "./components/ProductBrowser";
async function getInitialItems() {
  try {
    const res = await fetch("/api/items", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch initial items:", error);
    return [];
  }
}

export default async function HomePage() {
  const initialItems = await getInitialItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pass server-fetched data as a prop to the client component */}
        <ProductBrowser initialItems={initialItems} />
      </main>
    </div>
  );
}