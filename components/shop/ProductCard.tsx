'use client';

import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300">
      <div className="aspect-square bg-neutral-800 relative overflow-hidden">
        {product.image ? (
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500 font-mono">
                No Image
            </div>
        )}
        
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 p-3 bg-white text-black rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="text-xs text-primary font-mono mb-2 uppercase tracking-wider">{product.category}</div>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
        <div className="font-bold text-lg">Rs. {product.price}</div>
      </div>
    </div>
  );
}
