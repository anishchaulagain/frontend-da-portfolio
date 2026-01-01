'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, removeFromCart, total, isCartOpen, setIsCartOpen } = useCart();

  const handleCheckout = () => {
    const phoneNumber = "9779866335500"; 
    const message = encodeURIComponent(
      `Hello, I would like to order:\n\n${items
        .map((item) => `- ${item.name} (x${item.quantity}) - Rs.${item.price * item.quantity}`)
        .join('\n')}\n\nTotal: Rs.${total}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 border-l border-white/10 z-50 p-6 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag /> Cart ({items.length})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <ShoppingBag size={48} className="mb-4 opacity-50" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                    {/* Image placeholder if actual image not loaded */}
                    <div className="w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> 
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                        )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Rs.{item.price} x {item.quantity}</p>
                    </div>
                    
                    <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 pt-6 mt-4">
              <div className="flex justify-between items-center mb-6 text-xl font-bold">
                <span>Total</span>
                <span>Rs.{total}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
