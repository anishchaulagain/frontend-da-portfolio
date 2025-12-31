'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setIsCartOpen, items } = useCart();

  useEffect(() => {
    // Update this URL to match your backend port/route
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/products`); 
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Shop <span className="text-primary italic">Handmade</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl">
             Unique crochet items, crafted with love and engineering precision.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
      {!loading && products.length === 0 && (
         <div className="text-center py-20 text-muted-foreground">
            No products found. Use the Admin panel to add some!
         </div>
      )}
    </div>
  );
}
